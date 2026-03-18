const express = require(`express`);
const db = require(`./db/connection`);

const app = express();
const port = 3000;

app.use(express.json());

// ROTTA INDEX
app.get("/movies", (req, res) => {
    const sql = "SELECT * FROM movies";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "Errore durante il recupero dei film",
            });
        }

        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server avviato sulla porta ${port}`);
});
