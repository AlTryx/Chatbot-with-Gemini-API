# Chatbot with Gemini API & Live Face Detection

## 🧠 Project Goals

This project brings together the power of the Google Gemini API for an intelligent chatbot and real-time face detection using DeepFace and OpenCV. The main goal is to create an interactive application that can both communicate with users and analyze facial emotions live.

---

## 🚀 Technologies Used

- **Python 3.x**
- **Google Gemini API** – for smart chatbot capabilities
- **DeepFace** – for face detection and analysis
- **OpenCV** – for video stream processing
- **Streamlit** *(if you want a web interface)*
- **Git** – for version control

---

## ⚙️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR-REPO.git
   cd Chatbot-with-Gemini-API
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Linux/Mac:
   source venv/bin/activate
   ```

3. **Install the dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up your API keys:**
   - Create a `.env` file and add your Gemini API key:
     ```
     GEMINI_API_KEY=your_key_here
     ```

---

## 🖥️ How to Use

### Start the chatbot:
```bash
python chatbot.py
```

### Start live face detection:
```bash
python face_live.py
```

- Press `q` to stop the video stream.

---

## 💡 Example Use Cases

- Have a conversation with an intelligent chatbot.
- Detect and analyze faces and emotions in real time via your webcam.
- Easily extend with more features (e.g., age, gender, or emotion recognition).

---

## 📂 Project Structure

```

```

---

## 📝 Tips & Recommendations

- **Don’t commit large or generated files** (like `venv/`, `__pycache__/`, etc.) – use `.gitignore` to keep your repo clean.
- **Keep your API keys secret** – never commit them to a public repo.
- **Update dependencies** as needed to stay secure and up-to-date.

---

## 🌱 Ideas for the Future

- Add a web interface with Streamlit or Flask.
- Integrate with other AI services.
- Record and analyze conversations.
- Support for multiple languages.

---

## 📧 Contact

For questions or suggestions: altryx15@gmail.com

---

> **Made with ❤️ by Aleksandar Stanchev**