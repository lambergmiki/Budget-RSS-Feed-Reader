import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const form = document.querySelector("#url-form");
    const urlInput = document.querySelector("#url-input");
    const feedBox = document.querySelector("#feed-box");
    const refreshButton = document.querySelector("#refresh-button");
    const sortByPublished = document.querySelector("#sort-published");
    const sortByRead = document.querySelector("#sort-read");

    // TODO: Should lead to a new page with articles marked "read later".
    const readLater = document.querySelector("#read-later");

    let feedData;

    form.addEventListener("submit", getContentFromBackend);

    // Handle clicks on refresh button
    refreshButton.addEventListener("click", (event) => {
        event.preventDefault();

        // TODO: Call getContentFromBackend() again, to refresh the feed - is there a better way?
    });

    // Handle clicks on sort by published date
    sortByPublished.addEventListener("click", (event) => {
        event.preventDefault();

        // TODO: implement logic for sorting based on published date/time
    });

    // Handle clicks on sort by read
    sortByRead.addEventListener("click", (event) => {
        event.preventDefault();

        // TODO: implement logic for sorting based on read status
    });

    // TODO: Subject to testing. Button not yet implemented.
    readLaterButton.addEventListener("click", (event) => {
        event.preventDefault();

        // TODO: Redirect to read-later page

        feedBox.innerHTML = "";

        for (const property of readLaterArray) {
            feedBox.innerHTML += `<div>${property}</div>`;
            feedBox.innerHTML += `<div>${property.title}</div>`;
            feedBox.innerHTML += `<div>${property.link}</div>`;
            feedBox.innerHTML += `<div>${property.published}</div>`;
        }
    });

    /**
     * Sends the URL submitted by the user to the backend for processing.
     * Receives the processed data as HTML which is then rendered on the frontend.
     *
     * @param {*} event the form submission event, triggered by clicking "submit" or keypress "enter".
     */
    async function getContentFromBackend(event) {
        // Prevent page refresh
        event.preventDefault();

        // Use development base URL if available, otherwise resolve to an empty string
        const backendBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

        const res = await fetch(`${backendBaseUrl}/processUrl`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                parcel: urlInput.value,
            }),
        });

        // data is the output as an object, { htmloutput: '<div>...', arrayOutput: [..., ...] }
        const data = await res.json();

        // Assign a "read" property to each article
        for (const article of data.arrayOutput) {
            article.read = false;
        }

        // Store fetched data for later, mainly the `arrayOutput`
        feedData = data;

        // Render the HTML value
        feedBox.innerHTML = data.htmlOutput;
    }

    async function loadFeedData() {}
});
