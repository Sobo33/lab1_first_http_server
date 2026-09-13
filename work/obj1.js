const express = require ("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Документация API");
});

app.get("/api/features", (req, res) => {
    res.json({
        features: ["auth", "data"]
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});