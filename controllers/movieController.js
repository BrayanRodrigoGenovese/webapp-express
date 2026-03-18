const db = require("../db/connection.js");

function index(req, res) {
    const sql = "SELECT * FROM movies";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "Errore durante il recupero dei film",
            });
        }

        res.json(results);
    });
}

function show(req, res) {
    const movieId = req.params.id;
    const movieSql = "SELECT * FROM movies WHERE id = ?";

    db.query(movieSql, [movieId], (err, movieResults) => {
        if (err) {
            return res.status(500).json({
                error: "Errore durante il recupero dei film",
            });
        }

        if (movieResults.length === 0) {
            return res.status(404).json({
                error: "Film non trovato",
            });
        }

        const movie = movieResults[0];
        const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?";

        db.query(reviewsSql, [movieId], (err, reviewsResults) => {
            if (err) {
                return res.status(500).json({
                    error: "Errore durante il recupero delle recensioni",
                });
            }

            movie.reviews = reviewsResults;
            res.json(movie);
        });
    });
}

module.exports = { index, show };
