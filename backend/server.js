import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("❌ ERROR: The API Key is not defined. Check your .env file");
    process.exit(1);
}

console.log("✅ API Key loaded successfully:", API_KEY);

const app = express();
app.use(cors());

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "❌ City is required" });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`;

    try {
        const response = await fetch(url);
        console.log(`🌍 Fetching weather for ${city}... Status: ${response.status}`);

        if (response.status === 401) {
            return res.status(401).json({ error: "❌ Invalid API Key" });
        }
        if (response.status === 404) {
            return res.status(404).json({ error: "❌ City not found" });
        }
        if (!response.ok) {
            return res.status(response.status).json({ error: "⚠️ Error fetching weather data" });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("❌ Error fetching weather data:", error);
        res.status(500).json({ error: "⚠️ Internal Server Error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
