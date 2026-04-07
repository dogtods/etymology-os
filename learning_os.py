import streamlit as st
import json
import time
import sqlite3
import pandas as pd
from datetime import datetime, timedelta
import graphviz
import google.generativeai as genai
import os

# --- CONFIGURATION & SETTINGS ---
APP_NAME = "Neuro-Linguistic OS"
UI_LANG = "ja"  # UIは日本語
LOGIC_LANG = "en" # コード・ロジックは英語

# Initial Etymology Kernel (Analytical / Environmental / AI focus)
ETYMOLOGY_KERNEL = {
    "spect": {"meaning": "見る", "origin": "Latin", "examples": ["inspect", "perspective"]},
    "log": {"meaning": "言葉・論理", "origin": "Greek", "examples": ["logic", "analogy"]},
    "gen": {"meaning": "生じる・種", "origin": "Greek", "examples": ["generate", "genetic"]},
    "struct": {"meaning": "建てる", "origin": "Latin", "examples": ["structure", "construct"]},
    "ana": {"meaning": "上に・再び・分解", "origin": "Greek", "examples": ["analysis", "anatomy"]},
    "envir": {"meaning": "囲む", "origin": "French", "examples": ["environment"]},
    "neur": {"meaning": "神経", "origin": "Greek", "examples": ["neural", "neuron"]},
}

# --- GEMINI API SETUP ---
def configure_genai():
    api_key = None
    
    # 1. First, check UI-saved key from Environment (managed in Settings)
    api_key = os.getenv("GOOGLE_API_KEY")
    
    # 2. Then check st.secrets if no UI key exists
    if not api_key:
        try:
            if "GOOGLE_API_KEY" in st.secrets:
                key = st.secrets["GOOGLE_API_KEY"]
                # Ignore placeholder values
                if "PASTE_YOUR_API_KEY" not in str(key):
                    api_key = key
        except Exception:
            pass
        
    if api_key:
        genai.configure(api_key=api_key)
        return True
    return False

# --- DATABASE SETUP ---
def init_db():
    conn = sqlite3.connect('learning_os.db', check_same_thread=False)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS vocabulary 
                 (word TEXT PRIMARY KEY, 
                  meaning TEXT,
                  etymology JSON, 
                  svoc TEXT,
                  next_review DATETIME, 
                  latency_avg REAL, 
                  mastery_level INTEGER,
                  last_responded DATETIME)''')
    conn.commit()
    return conn

# --- CORE LOGIC: SRS & LATENCY ---
def calculate_next_review(current_level, latency_ms, correct):
    if not correct:
        return datetime.now() + timedelta(minutes=30), 0 # Quick review if wrong
    
    # Latency Penalty: If response takes > 3000ms, treat as 'Hard'
    penalty = 0.5 if latency_ms > 3000 else 1.0
    
    # Simple SRS algorithm (modified SM-2 like)
    new_level = current_level + 1
    days = (new_level * 2) * penalty
    return datetime.now() + timedelta(days=days), new_level

# --- AI ANALYSIS LOGIC ---
def analyze_text_with_llm(text):
    if not configure_genai():
        return None, "API Key not configured. Please set GOOGLE_API_KEY in secrets or env."
    
    model = genai.GenerativeModel('gemini-2.0-flash')
    
    kernel_context = json.dumps(ETYMOLOGY_KERNEL, ensure_ascii=False)
    
    prompt = f"""
    You are a Cognitive Scientist and Linguist. 
    Analyze the following English text: "{text}"
    
    Requirements:
    1. Extract the main vocabulary words (especially those related to Analysis, Environment, or AI/Tech).
    2. For each word, provide:
       - Meaning in Japanese.
       - SVOC structure (for the sentence it belongs to).
       - Etymology breakdown (Prefix, Root, Suffix).
    3. Optimization: Use the following known Etymology Kernel as context: {kernel_context}.
       IMPORTANT: DO NOT re-analyze or explain roots already in the kernel. Simply reference them by name if they exist in a word. 
       Focus on identifying new roots or how known roots are used.
    
    Return the result in JSON format:
    {{
        "words": [
            {{
                "word": "example",
                "meaning": "例",
                "svoc": "S: text, V: is, C: example",
                "etymology": {{
                    "prefix": "ex-",
                    "root": "emere",
                    "suffix": "",
                    "root_meaning": "take"
                }}
            }}
        ]
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        # Extract JSON from response (handling potential markdown formatting)
        content = response.text
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
            
        return json.loads(content), None
    except Exception as e:
        return None, str(e)

# --- UI COMPONENTS (Tailwind-like Minimalist Style) ---
def apply_custom_css():
    st.markdown("""
        <style>
        /* Base Theme */
        .stApp {
            background-color: #0f172a;
            color: #f8fafc;
        }
        
        /* Headers */
        h1, h2, h3 {
            color: #38bdf8 !important;
            font-family: 'Inter', sans-serif;
            font-weight: 700;
        }

        /* Sidebar */
        section[data-testid="stSidebar"] {
            background-color: #1e293b !important;
        }

        /* Buttons */
        .stButton>button {
            width: 100%;
            border-radius: 8px;
            background-color: #334155;
            color: #f8fafc;
            border: 1px solid #475569;
            transition: all 0.3s ease;
            font-weight: 600;
            padding: 0.5rem;
        }
        .stButton>button:hover {
            background-color: #38bdf8;
            color: #0f172a;
            border-color: #38bdf8;
            box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
        }

        /* Inputs */
        .stTextInput>div>div>input {
            background-color: #1e293b !important;
            color: #38bdf8 !important;
            border: 1px solid #334155 !important;
            border-radius: 8px !important;
            font-family: 'JetBrains Mono', monospace !important;
            padding: 12px !important;
        }
        .stTextInput>div>div>input:focus {
            border-color: #38bdf8 !important;
            box-shadow: 0 0 5px rgba(56, 189, 248, 0.5) !important;
        }

        /* Text Area */
        .stTextArea>div>div>textarea {
            background-color: #1e293b !important;
            color: #f8fafc !important;
            border: 1px solid #334155 !important;
            border-radius: 8px !important;
        }

        /* Cards */
        .recall-card {
            background-color: #1e293b;
            padding: 2rem;
            border-radius: 12px;
            border-left: 4px solid #38bdf8;
            margin-bottom: 2rem;
        }
        
        /* Status Tags */
        .status-tag {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: bold;
            margin-right: 5px;
        }
        .tag-hard { background-color: #ef4444; color: white; }
        .tag-easy { background-color: #22c55e; color: white; }
        </style>
    """, unsafe_allow_html=True)

# --- MAIN APP ---
def main():
    st.set_page_config(page_title=APP_NAME, page_icon="🧠", layout="wide")
    apply_custom_css()
    
    if 'start_time' not in st.session_state:
        st.session_state.start_time = None
    
    st.title(f"🧠 {APP_NAME}")
    
    conn = init_db()
    
    menu = ["Raw Ingestion", "Active Recall", "Root Network", "Settings"]
    choice = st.sidebar.selectbox("Menu", menu)
    
    if choice == "Raw Ingestion":
        st.subheader("📥 Raw Text Ingestion")
        st.markdown("遭遇した英文を入力して、AIによる語源・構文解析を行います。")
        raw_input = st.text_area("Input Text", placeholder="Deep learning neural networks are inspired by the structure of the human brain...", height=150)
        
        if st.button("Process with AI"):
            if not raw_input:
                st.warning("Please enter some text.")
            else:
                with st.spinner("Decoding etymology & syntax..."):
                    data, error = analyze_text_with_llm(raw_input)
                    if error:
                        st.error(f"Error: {error}")
                    else:
                        st.success(f"Successfully extracted {len(data['words'])} words.")
                        for item in data['words']:
                            word = item['word']
                            meaning = item['meaning']
                            etymology = json.dumps(item['etymology'])
                            svoc = item['svoc']
                            
                            # Save to DB
                            cursor = conn.cursor()
                            cursor.execute('''INSERT OR REPLACE INTO vocabulary 
                                            (word, meaning, etymology, svoc, next_review, latency_avg, mastery_level)
                                            VALUES (?, ?, ?, ?, ?, ?, ?)''',
                                         (word, meaning, etymology, svoc, datetime.now(), 0, 0))
                            conn.commit()
                            
                            with st.expander(f"Word: **{word}**"):
                                st.write(f"**Meaning:** {meaning}")
                                st.write(f"**SVOC:** `{svoc}`")
                                st.json(item['etymology'])

    elif choice == "Active Recall":
        st.subheader("⚡ Desirable Difficulty: Active Recall")
        
        # Get word due for review
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM vocabulary WHERE next_review <= ? OR next_review IS NULL ORDER BY mastery_level ASC LIMIT 1', (datetime.now(),))
        row = cursor.fetchone()
        
        if not row:
            st.info("すべての復習が完了しています！ 🎉")
            if st.button("ランダムに練習する"):
                cursor.execute('SELECT * FROM vocabulary ORDER BY RANDOM() LIMIT 1')
                row = cursor.fetchone()
        
        if row:
            word, meaning, etymology_json, svoc, next_review, latency_avg, mastery_level, last_resp = row
            etymology = json.loads(etymology_json)
            
            st.markdown(f"""
            <div class="recall-card">
                <h2 style='margin-top:0;'>Target Word: <span style='color:#38bdf8;'>{word}</span></h2>
                <p style='color:#94a3b8; font-size:0.9rem;'>Level: {mastery_level}</p>
            </div>
            """, unsafe_allow_html=True)
            
            # Start timer if not already started
            if st.session_state.start_time is None:
                st.session_state.start_time = time.time()
            
            user_input = st.text_input("意味、または語根の意味を入力してください", key="user_answer")
            
            col1, col2 = st.columns([1, 4])
            with col1:
                if st.button("Submit"):
                    end_time = time.time()
                    latency = (end_time - st.session_state.start_time) * 1000
                    st.session_state.start_time = None # Reset
                    
                    is_correct = any(keyword in user_input for keyword in [meaning, etymology.get('root_meaning', ''), etymology.get('root', '')])
                    
                    if is_correct:
                        st.balloons()
                        status = "Perfect" if latency < 3000 else "Slow (Hard)"
                        st.success(f"**Correct!** Latency: `{latency:.0f}ms` ({status})")
                        
                        next_date, new_level = calculate_next_review(mastery_level, latency, True)
                        
                        cursor.execute('''UPDATE vocabulary SET 
                                        next_review = ?, latency_avg = ?, mastery_level = ?, last_responded = ?
                                        WHERE word = ?''',
                                     (next_date, latency, new_level, datetime.now(), word))
                        conn.commit()
                        
                        st.write(f"Next Review: {next_date.strftime('%Y-%m-%d %H:%M')}")
                    else:
                        st.error(f"**Incorrect.**")
                        st.markdown(f"### AI Diagnosis")
                        # Basic logic diagnosis
                        diagnosis = f"接頭辞 `{etymology.get('prefix', 'n/a')}` + 語根 `{etymology.get('root', 'n/a')}` ({etymology.get('root_meaning', 'n/a')}) + 接尾辞 `{etymology.get('suffix', 'n/a')}` の構造です。"
                        st.write(diagnosis)
                        st.write(f"意味: **{meaning}**")
                        st.write(f"文脈(SVOC): `{svoc}`")
                        
                        next_date, new_level = calculate_next_review(mastery_level, latency, False)
                        cursor.execute('''UPDATE vocabulary SET 
                                        next_review = ?, mastery_level = ?, last_responded = ?
                                        WHERE word = ?''',
                                     (next_date, new_level, datetime.now(), word))
                        conn.commit()
            
            with col2:
                if st.button("Skip / Show Answer"):
                    st.session_state.start_time = None
                    st.info(f"Answer: {meaning} (Root: {etymology.get('root')})")

    elif choice == "Root Network":
        st.subheader("🕸️ Etymology OS Visualization")
        
        # Get all roots from DB to build a network
        cursor = conn.cursor()
        cursor.execute('SELECT word, etymology FROM vocabulary')
        rows = cursor.fetchall()
        
        roots = {}
        for row in rows:
            word = row[0]
            etym = json.loads(row[1])
            root = etym.get('root')
            if root:
                if root not in roots:
                    roots[root] = []
                roots[root].append(word)
        
        if not roots:
            st.warning("まだデータがありません。先に Ingestion を行ってください。")
        else:
            selected_root = st.selectbox("Select Root to Visualize", list(roots.keys()))
            
            dot = graphviz.Digraph()
            dot.attr(bgcolor='#0f172a', fontcolor='white')
            dot.attr('node', shape='ellipse', style='filled', fillcolor='#1e293b', color='#38bdf8', fontcolor='#38bdf8')
            dot.attr('edge', color='#475569')
            
            root_info = ETYMOLOGY_KERNEL.get(selected_root, {"meaning": "???"})
            dot.node('R', f"Root: {selected_root}\n({root_info['meaning']})", fillcolor='#38bdf8', fontcolor='#0f172a')
            
            for i, word in enumerate(roots[selected_root]):
                node_id = f"W{i}"
                dot.node(node_id, word)
                dot.edge('R', node_id)
            
            st.graphviz_chart(dot)

    elif choice == "Settings":
        st.subheader("⚙️ Settings")
        st.markdown("### DATA Management")
        if st.button("Reset Database"):
            cursor = conn.cursor()
            cursor.execute('DROP TABLE IF EXISTS vocabulary')
            conn.commit()
            st.success("Database reset successfully.")
            st.rerun()
            
        st.markdown("### API Configuration")
        st.write("Google API Key is required for LLM functions.")
        api_key_input = st.text_input("Enter Google API Key", type="password", value=os.getenv("GOOGLE_API_KEY", ""))
        if st.button("Save API Key to Session"):
            os.environ["GOOGLE_API_KEY"] = api_key_input
            st.success("API Key saved for current session.")

if __name__ == "__main__":
    main()
