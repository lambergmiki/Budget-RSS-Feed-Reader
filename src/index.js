import logger from "morgan";
import { convertRssToHtml } from "rss2html";

import express from "express";

const cors = cors();
app.use(cors());

const app = express();
const port = 3000;

const logger = logger("dev");

app.get("/", (req, res) => {
    try {
    } catch (error) {
        console.log(`Error message: ${error}`);
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
