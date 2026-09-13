const express = require("express");

const app = express();
const port = 3000;

app.use ((req, res, next) => {
    console.log(
        `${new Date().toISOString()} ${req.method} ${req.url}`
    );
    next();
});

app.get("/", (req,res) => {
    res.send ("Бронирование отелей");
});

app.get ("/api/rooms", (req,res) => {
    res.json([
        {
            id: 1,
            number: 101,
            type: "Single"
        },
        {
            id: 2,
            number: 102,
            type: "Double"
        },
        {
            id: 3,
            number: 103,
            type: "Mnogo"
        }
    ]);
});

app.get ("/api/hotels", (req, res) => {
    res.json([
    {
        id: 1,
        name: "Hotel Six"
    },
    {
        id: 2,
        name: "Big Hotel"
    },
    {
        id: 3,
        name: "Small Hotel"
    }
    ]);
});

app.get("/api/rooms/:id", (req, res) => {
    res.json({
        requestedId: req.params.id,
        status: "success"
    });
});

app.use((req, res) => {
    res.status(404).json({
        error:"Not found"
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});