import express from "express";
import cors from "cors";
import pool from "./config/database.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/fragrances", async (req, res) => {
  try {
    const { id, name, description, category, image_url } = req.body;

    const newFragrance = await pool.query(
      "INSERT INTO fragrances (id, name, description, category, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, name, description, category, image_url]
    );
    res.json(newFragrance.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/fragrances", async (req, res) => {
  try {
    const allFragrances = await pool.query("SELECT * FROM fragrances");
    res.json(allFragrances.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/fragrances/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fragrance = await pool.query(
      "SELECT * FROM fragrances WHERE id = $1",
      [id]
    );
    res.json(fragrance.rows[0]);
    console.log(req.params);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/fragrances/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, image_url } = req.body;
    const updateFragrance = await pool.query(
      "UPDATE fragrances SET name = $1, description = $2, category = $3, image_url = $4 WHERE id = $5",
      [name, description, category, image_url, id]
    );

    res.json({ message: "Fragrance updated successfully" });
  } catch (err) {
    console.error(err);
  }
});

export default app;
