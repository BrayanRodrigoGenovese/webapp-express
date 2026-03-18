const express = require(`express`);
const db = require(`./db/connection`);

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.use("/movies", movieRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server avviato sulla porta ${port}`);
});
