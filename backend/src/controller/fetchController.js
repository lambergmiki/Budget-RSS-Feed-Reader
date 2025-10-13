export async function callUrlConverter() {
    const { urlFromUser } = req.body;
    const urlList = [];

    const result = await convertRssToHtml(
        "https://www.theverge.com/rss/index.xml"
    );
    urlList.push(urlFromUser);
    console.log(result);
}
