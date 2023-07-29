const axios = require("axios");
const express = require("express");
const { Pool } = require("pg");
const app = express();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Add this middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your React app's URL
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const pool = new Pool({
  user: "default",
  host: "ep-curly-sky-219149-pooler.us-east-1.postgres.vercel-storage.com",
  database: "verceldb",
  password: "PiVdcDkos97b",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // You might need to adjust this according to your SSL settings
    require: true,
  },
});

app.use(express.json());

// Route to generate a response to a review
app.post("/generate-response", async (req, res) => {
  const user_id = req.body.user;
  const review_text = req.body.review;
  const product_type = req.body.product_type; // Add this line to get the product_type from the request body

  // Add product_type to the prompt
  const prompt =
    "Generate a detailed response of a " + product_type +  ". Here it is: " + review_text;

  console.log(prompt)
  // Get the AI response
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a bot that generates replies to customer review up to 30 words. Make the language centric to the industry that the product is in so it seems written by a human. Write like a human.",
        },
        { role: "user", content: prompt },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
    }
  );

  // Extract the AI-generated reply text
  const reply_text = response.data.choices[0].message.content;

  // Insert the AI-generated reply into the database
  const query =
    "INSERT INTO generatedreplies (user_id, review_text, reply_text, product_type) VALUES ($1, $2, $3, $4)";
  const values = [user_id, review_text, reply_text, product_type]; // Add product_type to the values array

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error saving response to database:", err);
      res.status(500).json({ error: "Error saving response to database" });
      return;
    }

    console.log("Response saved to database:", result);
    res.json({ response: reply_text });
  });
});

// Route to get all replies for a user
app.get("/replies/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  const query = "SELECT * FROM GeneratedReplies WHERE user_id = $1";
  pool.query(query, [user_id], (err, result) => {
    if (err) {
      console.error("Error getting replies from database:", err);
      res.status(500).json({ error: "Error getting replies from database" });
      return;
    }
    console.log("Replies retrieved from database:", result);

    // Return the replies as a JSON array
    res.json(result.rows);
  });
});

// Route to delete a specific review
app.delete("/review/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM GeneratedReplies WHERE id = $1";
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting review from database:", err);
      res.status(500).json({ error: "Error deleting review from database" });
      return;
    }

    console.log("Review deleted from database:", result);
    res.json({ message: "Review deleted successfully" });
  });
});

// Search review endpoint
app.post("/reviews", (req, res) => {
  const { user_id, search_term } = req.body;

  // Check if user_id is provided in the request body
  if (!search_term) {
    // If no search term provided, return all rows
    pool.query(
      "SELECT * FROM GeneratedReplies WHERE user_id = $1",
      [user_id],
      (err, result) => {
        if (err) {
          console.error("Error getting reviews from database:", err);
          res
            .status(500)
            .json({ error: "Error getting reviews from database" });
          return;
        }
        console.log("All reviews retrieved from database:", result);

        // Return the reviews as a JSON array
        res.json(result.rows);
      }
    );
    return;
  }

  // Split the search_term into individual words
  const searchWords = search_term
    .split(" ")
    .filter((word) => word.trim() !== "");

  // Check if there are any non-empty search words
  if (searchWords.length === 0) {
    res.status(400).json({
      error: "At least one non-empty search word is required",
    });
    return;
  }

  // Build the query to search for any of the search words in review_text, product_type, and reply_text
  let query = "SELECT * FROM GeneratedReplies WHERE user_id = $1 AND (";
  const values = [user_id];

  for (let i = 0; i < searchWords.length; i++) {
    query += `review_text LIKE $${i + 2} OR product_type LIKE $${
      i + 2
    } OR reply_text LIKE $${i + 2}`;
    values.push(`%${searchWords[i]}%`);

    if (i !== searchWords.length - 1) {
      query += " OR ";
    }
  }
  query += ")";

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error getting reviews from database:", err);
      res.status(500).json({ error: "Error getting reviews from database" });
      return;
    }
    console.log("Reviews retrieved from database:", result);

    // Return the reviews as a JSON array
    res.json(result.rows);
  });
});

// FIRST METRIC
// count all the reviews by a specific user
app.post("/processed-reviews-count", (req, res) => {
  // The user_id is passed in the request body
  const userId = req.body.user_id;

  const query = `SELECT COUNT(*) FROM GeneratedReplies WHERE user_id = $1`;

  pool.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error getting count from database:", err);
      res.status(500).json({ error: "Error getting count from database" });
      return;
    }
    console.log("Count retrieved from database:", result);

    // Return the count as a JSON object
    const count = result.rows[0].count;
    res.json({ count });
  });
});

// SECOND METRIC
// GET ALL THE UNIQUE PRODUCT TYPES
app.post("/unique-product-types-count", (req, res) => {
  // The user_id is passed in the request body
  const userId = req.body.user_id;

  const query = `SELECT COUNT(DISTINCT product_type) FROM generatedreplies WHERE user_id = $1`;

  pool.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error getting count from database:", err);
      res.status(500).json({ error: "Error getting count from database" });
      return;
    }
    console.log("Count retrieved from database:", result);

    // Return the count as a JSON object
    const count = result.rows[0].count;
    res.json({ count });
  });
});

// THIRD METRIC
app.post("/total-words-in-reviews-count", (req, res) => {
  const userId = req.body.user_id;

  const query = `
    SELECT SUM(LENGTH(reply_text) - LENGTH(REPLACE(reply_text, ' ', '')) + 1) AS word_count 
    FROM generatedreplies 
    WHERE user_id = $1`;

  pool.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error getting word count from database:", err);
      res.status(500).json({ error: "Error getting word count from database" });
      return;
    }
    console.log("Word count retrieved from database:", result);

    // Return the word count as a JSON object
    const wordCount = result.rows[0].word_count;
    res.json({ wordCount });
  });
});

// Route to get the distinct products submitted by a user
app.post("/distinct-products", (req, res) => {
  const { user_id } = req.body;

  const query = `SELECT DISTINCT product_type FROM generatedreplies WHERE user_id = $1`;

  pool.query(query, [user_id], (err, result) => {
    if (err) {
      console.error("Error getting distinct products from database:", err);
      res.status(500).json({ error: "Error getting distinct products from database" });
      return;
    }
    console.log("Distinct products retrieved from database:", result);

    // Return the distinct products as a JSON array
    res.json(result.rows.map(row => row.product_type));
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
