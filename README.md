# 🃏 Introducing `Text2Anki`
Text2Anki is an AI-powered web application designed to help users convert large texts into Anki flashcards. This app uses [DeepSeek](https://www.deepseek.com) to identify key information and generate flashcards that can be easily imported into [Anki](https://apps.ankiweb.net), a popular spaced repetition software.

## 📸 Screenshot
![demo](https://i.imgur.com/YmcZH75.png)

## 🚀 Features
- **DeepSeek text processing**: Utilizes the [DeepSeek](https://www.deepseek.com) natural language processing to extract key information and generate flashcards.
- **Web interface**: An web interface for ease of use.
- **Preview flashcards**: Allows users to preview the generated flashcards before exporting.
- **Support for multiple languages**: Can process texts in various languages.
- **Seamless Anki integration**: Directly exports flashcards in a CSV format compatible with [Anki](https://apps.ankiweb.net).

## 🔧 Installation
To set up Text2Anki locally, follow these steps:

1. **Clone the repository**:
```bash
git clone https://github.com/Bluh7/Text2Anki.git
cd Text2Anki
```

2. **Get an API key from OpenRouter**: https://openrouter.ai/settings/keys

2. **Adjust the environment variables**: You can check `.env.example`

3. **Build and initialize with Docker**:
```bash
docker compose up --build
```
## ⚡ Usage

1. **Open the application**: Navigate to `http://localhost:3000` in your web browser.
2. **Upload your text**: Write or paste your text into the provided text area.
3. **Generate flashcards**: Click the button to Generate your flashcards.
4. **Preview the flashcards**: Preview all the generate flashcards before downloading.
5. **Export to Anki**: Click the button to download the flashcards in CSV and import to your Anki.

## 🤝 Contributing
I welcome contributions from anyone! So feel free to contribute if you want.

## 🛡️ License
This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.
