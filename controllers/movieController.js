const db = require("../db/connection.js");

function index(req, res, next) {
    const sql = "SELECT * FROM movies";

    db.query(sql, (err, results) => {
        if (err) return next(err);

        res.json(results);
    });
}

function show(req, res, next) {
    const movieId = req.params.id;
    const movieSql = "SELECT * FROM movies WHERE id = ?";

    db.query(movieSql, [movieId], (err, movieResults) => {
        if (err) return next(err);

        if (movieResults.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Film non trovato",
            });
        }

        const movie = movieResults[0];
        const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?";

        db.query(reviewsSql, [movieId], (err, reviewsResults) => {
            if (err) return next(err);

            movie.reviews = reviewsResults;

            if (movie.reviews.length > 0) {
                const sum = movie.reviews.reduce(
                    (acc, review) => acc + review.vote,
                    0,
                );
                movie.average_vote = parseFloat(
                    (sum / movie.reviews.length).toFixed(1),
                );
            } else {
                movie.average_vote = 0;
            }

            res.json(movie);
        });
    });
}

function storeReview(req, res, next) {
    const movieId = req.params.id;
    const { name, vote, text } = req.body;

    if (!name || !vote || !text || isNaN(vote) || vote < 1 || vote > 5) {
        return res.status(400).json({
            success: false,
            message: "Dati della recensione non validi o mancanti",
        });
    }

    const sql =
        "INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)";

    db.query(sql, [movieId, name, vote, text], (err, results) => {
        if (err) return next(err);

        res.status(201).json({
            success: true,
            message: "Recensione aggiunta con successo",
            id: results.insertId,
        });
    });
}

module.exports = { index, show, storeReview };
