import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const form = document.querySelector("#url-form");
    const urlInput = document.querySelector("#url-input");
    const feedBox = document.querySelector("#feed-box");
    const refreshButton = document.querySelector("#refresh-button");
    const sortByPublished = document.querySelector("#sort-published");
    const sortByRead = document.querySelector("#sort-read");
    const readLater = document.querySelector("#read-later");

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

    /**
     * Sends the URL submitted by the user to the backend for processing.
     * Receives the processed data as HTML which is then rendered on the frontend.
     *
     * @param {*} event the form submission event, triggered by clicking "submit" or keypress "enter".
     */
    async function getContentFromBackend(event) {
        // Prevent page refresh
        event.preventDefault();

        const res = await fetch("https://bfr.mikilamberg.com/processUrl", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                parcel: urlInput.value,
            }),
        });

        // data is the output as an object, { htmloutput: '<div>...' }
        const data = await res.json();

        // Paste the value from the htmlOutput object and render on page
        feedBox.innerHTML = data.htmlOutput;
    }
});
