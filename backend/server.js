// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Store the locations (in-memory for now)
let locations = [];

// Route to save the location
app.post("/save-location", (req, res) => {
    const { address, coordinates } = req.body;

    if (!address || !coordinates) {
        return res.status(400).send({ error: "Invalid data" });
    }

    locations.push({ address, coordinates });
    console.log("Saved Location: ", { address, coordinates });

    res.status(200).send({ message: "Location saved successfully" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
