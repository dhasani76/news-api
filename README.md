# Chronicle | Modern News Parser

Chronicle is a professional, clean, and responsive Node.js web application that connects to the NewsAPI to retrieve and parse global articles matching your keywords, date ranges, and language preferences.

---

## Features

- **Modern Visuals**: Designed with a sleek, light slate theme, customizable input fields, elegant search hero, and a responsive grid layout of news cards with hover zoom animations.
- **Client & Server-Side Error Handling**: Native browser date pickers set with a 30-day lookback boundary matching NewsAPI's developer plan restrictions, accompanied by custom error banner notifications for API issues or missing inputs.
- **Robust API Key Protection**: Keeps credentials safe by loading variables locally using a secure `.env` file structure.
- **Fallback Content**: Beautiful CSS image placeholders for articles missing cover images, or image source load failures.

---

## Prerequisites

Before running this application, you must have the following installed:
- **Node.js** (v16.0.0 or higher recommended)
- **NPM** (packaged with Node.js)
- A **NewsAPI Key** (Get a free one from [NewsAPI.org](https://newsapi.org/))

---

## Installation

1. **Install dependencies**:
   Open a terminal in the root project folder and run:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root of the project (this is ignored by Git using the `.gitignore` setup).
   Add the following configuration (replace `YOUR_NEWS_API_KEY` with your actual NewsAPI key):
   ```env
   PORT=3000
   NEWS_API_URL=https://newsapi.org/v2/everything?
   NEWS_API_KEY=YOUR_NEWS_API_KEY
   ```

---

## Running the Application

### Development Mode (with Auto-Reload)
This project uses `nodemon` to automatically restart the server when files are edited:
```bash
npm run dev
```
Alternatively, you can run nodemon directly:
```bash
npx nodemon index.js
```

### Production Mode (Standard Startup)
To launch the server without auto-reload:
```bash
npm start
```
Or directly using Node:
```bash
node index.js
```

Once started, open your web browser and navigate to:
```
http://localhost:3000
```

---

## Folder Structure

```
NEWS - API/
├── public/
│   └── styles.css        # Custom CSS variables, grid systems, and animations
├── views/
│   ├── partials/
│   │   ├── header.ejs    # Global header containing Google Fonts and navbar layout
│   │   └── footer.ejs    # Global footer closing tags and copyright markup
│   ├── index.ejs         # Search form with date bounding & language selections
│   └── news.ejs          # Grid display containing EJS loop for article card rendering
├── .env                  # Configuration variables (API endpoint and secret API keys)
├── .gitignore            # Git exclusion rules for node_modules and .env
├── index.js              # Express app setup, environment loader, and API error catching
├── package.json          # Node dependency configurations and startup scripts
└── README.md             # Project documentation (this file)
```
