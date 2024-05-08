const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Configure CORS to allow your frontend's domain
app.use(cors({ origin: "http://localhost:5173" }));
// app.use(cors({ origin: "https://waterx.netlify.app" }));

// Proxy endpoint to fetch data from ESP32 API
app.get("/", async (req, res) => {
    console.log("Received request to /api/distance");
    try {
      const response = await axios.get("http://192.168.29.94/distance");
      console.log("Received response from ESP32:", response.data);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching distance data:", error.message);
      res.status(500).send("Error fetching distance data");
    }
  });
  
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
