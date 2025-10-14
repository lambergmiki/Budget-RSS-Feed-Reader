import express from "express";

export const router = express.Router();

import { convertRssToHtml } from "rss2html";

/**
 * Processes the URL from user input in frontend, then sends back converted data
 * for rendering on the frontend.
 */
router.post("/processUrl", async (req, res) => {
    const { parcel } = req.body;

    if (!parcel) {
        return res.status(400).send({ status: "failed" });
    }

    const htmlOutput = await convertRssToHtml(parcel);

    res.status(200).json({ convertedData: htmlOutput });
});
