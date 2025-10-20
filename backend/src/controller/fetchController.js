import { convertRssToHtml } from "rss2html";

export class FetchController {
    async callUrlConverter(req, res) {
        const { parcel } = req.body; // Contains the RSS-URL from the end user (client side)

        if (!parcel) {
            return res.status(400).send({ status: "failed" });
        }
        // Call module function for conversion of XML-URL to HTML string and Array of data
        const output = await convertRssToHtml(parcel);
        res.status(200).json(output);
    }
}
