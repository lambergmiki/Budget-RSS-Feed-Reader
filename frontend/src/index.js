import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const form = document.querySelector("#url-form");
    const urlInput = document.querySelector("#url-input");
    const feedBox = document.querySelector("#feed-box");

    form.addEventListener("submit", getContentFromBackend);

    /**
     * Sends the URL submitted by the user to the backend for processing.
     * Receives the processed data as HTML which is then rendered on the frontend.
     *
     * @param {*} event the form submission event, triggered by clicking "submit" or keypress "enter".
     */
    async function getContentFromBackend(event) {
        // Prevent page refresh
        event.preventDefault();

        const res = await fetch("http://localhost:3000/processUrl", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                parcel: urlInput.value,
            }),
        });

        const data = await res.json();

        feedBox.innerHTML = data.convertedData;
    }
});
