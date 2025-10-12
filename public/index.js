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
