import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Initialize dotenv to load environment variables from the .env file
dotenv.config();

const app = express();
// Use PORT from environment variables, or fall back to 3000
const PORT = process.env.PORT || 3000;

// Retrieve NewsAPI base URL and API Key from environment variables
const URL = process.env.NEWS_API_URL || 'https://newsapi.org/v2/everything?';
const API_KEY = process.env.NEWS_API_KEY;

// Middleware to parse URL-encoded request bodies (from form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static assets (CSS, images, clientside JS) from the 'public' directory
app.use(express.static('public'));

// Set EJS as the template engine
app.set('view engine', 'ejs');

/**
 * Route: GET /
 * Description: Renders the home search page.
 */
app.get('/', (req, res) => {
  res.render('index', { error: null });
});

/**
 * Route: POST /news
 * Description: Submits search query, calls NewsAPI, and renders the results page.
 */
app.post('/news', async (req, res) => {
    // Destructure search parameters from the request body
    const { topic, from, to, language } = req.body;
    
    // Ensure parameters are present before proceeding
    if (!topic || !from || !to || !language) {
      return res.render('index', { error: 'All search fields are required.' });
    }

    // Build the request URL for NewsAPI
    // encodeURIComponent is used on the search topic to safely handle spaces and special characters
    const url = `${URL}qInTitle=${encodeURIComponent(topic)}&from=${from}&to=${to}&language=${language}&apiKey=${API_KEY}`;
    
    try {
        // Double check API key presence
        if (!API_KEY) {
            throw new Error("News API Key is missing. Please verify that your .env file is set up correctly.");
        }

        // Fetch articles from NewsAPI
        const response = await axios.get(url);
        const articles = response.data.articles;

        // If no articles are returned, display a user-friendly message on the home page
        if (!articles || articles.length === 0) {
            return res.render('index', { 
                error: `No articles found for "${topic}" in the requested date range and language.` 
            });
        }

        // Render results page with retrieved articles
        res.render('news', { content: articles, error: null });
    } catch (error) {
        // Detailed error logging on the server console
        console.error("API Fetch Error:", {
            message: error.message,
            endpoint: url,
            responseData: error.response ? error.response.data : 'No details available'
        });

        // Determine user-friendly error message based on the API response
        let friendlyMessage = "An error occurred while fetching the news. Please try again later.";
        
        if (error.response && error.response.data && error.response.data.message) {
            // NewsAPI returns helpful descriptive messages, e.g. when requesting dates too far in the past
            friendlyMessage = error.response.data.message;
        } else if (error.message) {
            friendlyMessage = error.message;
        }

        // Render home page and display the error notification to the user
        res.render('index', { error: friendlyMessage });
    }
});

// Start Express server listening on designated PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
