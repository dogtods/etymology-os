import streamlit as st
import streamlit.components.v1 as components

# ページ設定
st.set_page_config(
    page_title="Etymology OS Engine",
    page_icon="📘",
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

# 外部のCSSやJSも含めて一つの巨大なHTMLとして埋め込むか、ローカルのまま読み込ませるか
# Streamlit Community Cloud の場合、ローカルのJS/CSSは iframe(components.html)からは読みにくいですが、
# シンプルにHTML全体をそのまま流し込んで機能させます。
# （ただし本格運用ではGitHub PagesのURLをiframeで読む方法が一番確実です）

with open('index.html', 'r', encoding='utf-8') as f:
    html_code = f.read()

# JSやCSSを文字列としてインライン置換して読み込むか、
# 最も簡単な方法は Streamlit アプリの中に展開することです。
components.html(
    html_code,
    height=900,
    scrolling=True
)
