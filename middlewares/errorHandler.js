function errorHandler(err, req, res, next) {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Errore interno del server",
    });
}

module.exports = errorHandler;
