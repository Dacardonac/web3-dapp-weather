const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const PORT = 3000;
const API_KEY = "97a713ab40d447288285aabbffdbb427";
const API_URL = "https://api.weatherapi.com/v1/current.json";

// Ruta para obtener el clima
app.get("/clima", async (req, res) => {
    const ciudad = req.query.ciudad;
    if (!ciudad) return res.status(400).json({ error: "Falta el parámetro ciudad" });

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}&q=${ciudad}&aqi=no`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos del clima" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});