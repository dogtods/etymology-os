import streamlit as st
import streamlit.components.v1 as components
import os
import re

# --- CONFIGURATION ---
PAGE_TITLE = "Etymology OS Engine"
PAGE_ICON = "📘"

# ページ設定
st.set_page_config(
    page_title=PAGE_TITLE,
    page_icon=PAGE_ICON,
    layout="wide",
    initial_sidebar_state="collapsed"
)

# ストリームリット特有の余白を消すためのCSS
st.markdown("""
    <style>
        .block-container {
            padding: 0rem !important;
            max-width: 100% !important;
        }
        header {
            display: none !important;
        }
    </style>
""", unsafe_allow_html=True)

def get_bundled_html():
    """Reads index.html and inlines all local CSS and JS files to bypass caching issues."""
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Inline CSS
    def replace_css(match):
        href = match.group(1)
        if os.path.exists(href):
            with open(href, 'r', encoding='utf-8') as f:
                return f"<style>\n{f.read()}\n</style>"
        return match.group(0)

    html = re.sub(r'<link rel="stylesheet" href="(css/.*?.css)">', replace_css, html)

    # 2. Bundle JS
    # Since the project uses ES Modules (import/export), we concatenate them in dependency order
    # and remove the import/export keywords so they work as a single script block.
    js_files = [
        'js/utils/ui.js',
        'js/utils/storage.js',
        'js/data/words.js',
        'js/data/roots.js',
        'js/modules/api.js',
        'js/modules/decomposition.js',
        'js/modules/network.js',
        'js/modules/quiz.js',
        'js/modules/drift.js',
        'js/app.js'
    ]

    bundled_js = "// --- BUNDLED ETYMOLOGY OS JS ---\n"
    for js_path in js_files:
        if os.path.exists(js_path):
            with open(js_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Remove ESM keywords to allow concatenation in a single scope
                content = re.sub(r'^import\s+.*?;?\s*$', '', content, flags=re.MULTILINE)
                content = re.sub(r'\bexport\s+', '', content)
                bundled_js += f"\n// File: {js_path}\n{content}\n"
    
    # Replace the main script tag with our bundled JS
    script_tag = '<script type="module" src="js/app.js"></script>'
    bundled_tag = f"<script type=\"module\">\n{bundled_js}\n</script>"
    
    if script_tag in html:
        html = html.replace(script_tag, bundled_tag)
    else:
        # Fallback: append before </body>
        html = html.replace('</body>', f"{bundled_tag}\n</body>")

    return html

# Generate and serve the app
try:
    html_content = get_bundled_html()
    components.html(
        html_content,
        height=900,
        scrolling=True
    )
except Exception as e:
    st.error(f"Bundle Error: {e}")
    st.info("Ensure index.html and the js/css folders are in the same directory.")
