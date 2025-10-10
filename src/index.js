import "./index.css";
// import { convertRssToHtml } from "rss2html";

// const result = await convertRssToHtml("https://www.theverge.com/rss/index.xml");

// console.log(result);

function sortByPubDate(event) {
  // Logic for shifting the list, e.g. by date (oldest/most recent)
  console.log("Button has been clicked", event);
}

function sortByRead(event) {
  // Logic for sorting feed by read status
}

function refreshFeed(event) {
  // Logic for making a new fetch to update feed
}

const button = document.querySelector("button");
button.addEventListener("click", sortByPubDate);
