
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import io
import base64

def generate_wordcloud(text):
    try:
        wordcloud = WordCloud(width=800, height=400, background_color='white').generate(text)
        plt.figure(figsize=(8, 4))
        plt.imshow(wordcloud, interpolation='bilinear')
        plt.axis("off")

        # 画像をBase64エンコード
        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img_str = base64.b64encode(img_buf.getvalue()).decode('utf-8')

        plt.close() # メモリリーク対策
        return img_str
    except Exception as e:
        print(f"Error generating wordcloud: {e}")
        return None

if __name__ == "__main__":
    text = "This is a test text for generating a word cloud. This text is repeated to show the effect of word frequency."
    img = generate_wordcloud(text)
    if img:
        print(img)
