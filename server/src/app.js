import express from "express";
import cors from "cors";
import pool from "./config/database.js";

const app = express();

app.use(cors());
app.use(express.json());

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully");
  }
});

app.post("/fragrances", async (req, res) => {
  try {
    const { name, description, category, image_url } = req.body;
    // Remove id from INSERT as it's auto-generated
    const newFragrance = await pool.query(
      "INSERT INTO fragrances (name, description, category, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, category, image_url]
    );
    res.json(newFragrance.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message }); // Add error response
  }
});

app.get("/fragrances", async (req, res) => {
  try {
    const allFragrances = await pool.query("SELECT * FROM fragrances");
    res.json(allFragrances.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message }); // Add error response
  }
});

app.get("/fragrances/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const formattedId = `frag-${id.padStart(3, "0")}`;
    const fragrance = await pool.query(
      "SELECT * FROM fragrances WHERE fragrance_id = $1",
      [formattedId]
    );

    if (fragrance.rows.length === 0) {
      return res.status(404).json({ error: "Fragrance not found" });
    }

    res.json(fragrance.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message }); // Add error response
  }
});

app.put("/fragrances/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const formattedId = `frag-${id.padStart(3, "0")}`;
    const { name, description, category, image_url } = req.body;
    const updateFragrance = await pool.query(
      "UPDATE fragrances SET name = $1, description = $2, category = $3, image_url = $4 WHERE fragrance_id = $5", // Changed id to fragrance_id
      [name, description, category, image_url, formattedId]
    );

    if (updateFragrance.rowCount === 0) {
      return res.status(404).json({ error: "Fragrance not found" });
    }

    res.json({ message: "Fragrance has been updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message }); // Add error response
  }
});

app.delete("/fragrances/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const formattedId = `frag-${id.padStart(3, "0")}`;

    // Add logging to see what's happening
    console.log("Attempting to delete fragrance:", formattedId);

    const deleteFragrance = await pool.query(
      "DELETE FROM fragrances WHERE fragrance_id = $1 RETURNING *",
      [formattedId]
    );

    if (deleteFragrance.rows.length === 0) {
      return res.status(404).json({
        error: `Fragrance with ID ${formattedId} not found`,
      });
    }

    // Log the deleted record
    console.log("Deleted fragrance:", deleteFragrance.rows[0]);

    res.json({
      message: `Fragrance ${formattedId} has been deleted`,
      deletedFragrance: deleteFragrance.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

export default app;
