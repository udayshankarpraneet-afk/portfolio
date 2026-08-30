# Uday Shankar Praneet - Developer & AI/ML Portfolio

A modern, high-performance, responsive portfolio website showcasing Uday Shankar Praneet's background in **Computer Science & Engineering (AI & ML)**, full-stack systems architecture, machine learning models, certifications, and competitive programming achievements.

---

## 🌟 Key Features

- 🌌 **Cyberpunk & Dark Luxury Aesthetics**: Glassmorphism with deep obsidian hues, neon cyan & violet accents, and smooth transitions.
- ✨ **Interactive Neural Network Background**: Dynamic HTML5 Canvas particle/constellation animation reflecting AI & ML principles.
- 💻 **Interactive Developer Terminal**: Embedded interactive CLI simulator (`help`, `skills`, `projects`, `ml`, `education`, `certs`, `contact`, `theme`, `quote`, `sudo`, `clear`).
- 🤖 **Live In-Browser AI/ML Predictor**: Interactive regression/classification model simulator where visitors can adjust feature vectors (study hours, attendance, projects, coding score) to see live predictions and dynamic feature activation weights.
- 🚀 **Featured Project Deep-Dive**: Comprehensive breakdown of the **Smart Classroom Management System** (IEEE 830-1998 standards, 500 concurrent users, sub-3s response, 99% uptime, 3-Role RBAC, automated attendance & exam pipelines).
- 🏆 **Achievements & Badges Matrix**: Highlighting the **LeetCode 100 Days Badge**, **100+ Solved Problems**, and **8.89 CGPA** honors.
- 📜 **Verified Credentials**: Intel AI For All, Infosys Cyber Security, and Saylor Python certifications.
- 🌓 **Dark & Light Mode**: Smooth theme toggling with `localStorage` persistence.
- 🖨️ **Print & PDF CV Ready**: Dedicated print stylesheet formatted for instant, clean PDF resume export (`Ctrl + P` or click "PDF CV").
- 📱 **100% Responsive**: Tailored for mobile, tablet, laptop, and ultra-wide displays.

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main single-page portfolio layout
├── README.md               # Documentation & deployment guide
└── assets/
    ├── css/
    │   ├── style.css       # Core styles, glassmorphism, responsive grid
    │   ├── animations.css  # Ambient glows, keyframes, hover micro-interactions
    │   └── print.css       # ATS-friendly PDF / print layout
    └── js/
        ├── main.js         # Navigation, theme toggle, modals, copy tools
        ├── neural-bg.js    # Canvas neural particle constellation
        ├── terminal.js     # Interactive CLI developer terminal
        └── ml-widget.js    # Interactive ML inference playground widget
```

---

## 🚀 How to Run Locally

You can run this portfolio locally with any static web server:

### Option 1: Python HTTP Server (Recommended)
```bash
# Navigate to the portfolio folder
cd portfolio

# Start local server on port 8000
python -m http.server 8000
```
Open your browser and navigate to `http://localhost:8000`.

### Option 2: Direct Browser
Simply double-click `index.html` or open it with Google Chrome / Microsoft Edge / Firefox.

---

## 🌐 How to Deploy for Free

### 1. Deploy on GitHub Pages
1. Push this repository to your GitHub account (`udayshankarpraneet-afk`).
2. Go to repository **Settings** → **Pages**.
3. Under **Branch**, select `main` (or `master`) and `/root` folder, then click **Save**.
4. Your portfolio will be live at `https://udayshankarpraneet-afk.github.io/portfolio/`.

### 2. Deploy on Vercel or Netlify
- Drag and drop the `portfolio` folder directly into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com).
