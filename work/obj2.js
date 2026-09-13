const express = require ("express");

const app = express();
const port = 3000;

app.get ("/", (req, res) => {
    res.send("Список игр");
});

app.get ("/api/games", (req, res) => {
    res.json ([
        {
            id: 1,
            name: "The Elder Scrolls III: Morrowind",
            genre: "RPG"
        },
        {
            id: 2,
            name: "Diablo II",
            genre: "Action RPG"
        },
        {
            id: 3,
            name: "Hearts of Iron IV",
            genre: "Strategy"
        }
    ]);
});

app.get ("/api/platforms", (req, res) => {
    res.json ([
        {
            id: 1,
            platform: "Xbox"
        },
        {
            id: 2,
            platform: "PC"
        },
        {
            id: 3,
            platform: "PC"
        }
    ]);
});

app.use((req,res) => {
    res.status(404).json({
        error: "Not found"
    });
});


app.listen (port, () => {
    console.log (`Сервер запущен на http://localhost:${port}`);
});




