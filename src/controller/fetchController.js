import http from "node:http";

export async function callUrlConverter() {
    const urlList = [];

    const result = await convertRssToHtml(
        "https://www.theverge.com/rss/index.xml"
    );
    console.log(result);
}
