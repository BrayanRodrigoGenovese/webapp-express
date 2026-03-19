const express = require(`express`);
const movieRouter = require("./routers/movieRouter");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.static("public"));
app.use(express.json());

app.use("/movies", movieRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server avviato sulla porta ${port}`);
});
