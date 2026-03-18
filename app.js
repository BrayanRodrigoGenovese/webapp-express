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

// ROTTA SHOW
app.get("/movies/:id", (req, res) => {
    const movieId = req.params.id;

    const sql = "SELECT * FROM movies WHERE id = ?";

    db.query(sql, [movieId], (err, movieResults) => {
        if (err) {
            return res.status(500).json({
                error: "Errore durante il recupero dei film",
            });
        }

        if (movieRestults.length === 0) {
            return res.status(404).json({
                error: "Film non trovato",
            });
        }

        const movie = movieRestults[0];

        const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?";

        db.query(sql, [movieId], (err, reviewsResults) => {
            if (err) {
                return res.status(500).json({
                    error: "Errore durante il recupero delle recensioni",
                });
            }

            movie.reviews = reviewsResults;

            res.json(movie);
        });
    });
});

app.listen(port, () => {
    console.log(`Server avviato sulla porta ${port}`);
});
