import { convertRssToHtml } from "rss2html";

export class FetchController {
    async callUrlConverter(req, res) {
        const { parcel } = req.body; // RSS-URL

        if (!parcel) {
            return res.status(400).send({ status: "failed" });
        }

        // Call module function for conversion of raw XML to HTML end product
        const htmlOutput = await convertRssToHtml(parcel);
        res.status(200).json({ htmlOutput });
    }
}
