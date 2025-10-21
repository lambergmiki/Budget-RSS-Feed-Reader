import "./index.css";
import { FeedManager } from "../utility/FeedManager.js";
import { FeedRenderer } from "../utility/FeedRenderer.js";
import { FeedSorter } from "../utility/FeedSorter.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#url-form");
    const urlInput = document.querySelector("#url-input");
    const feedContainer = document.querySelector(".feed-container");
    const navRefresh = document.querySelector("#refresh");
    const navSortByPublished = document.querySelector("#sort-published");
    const navReadLaterHome = document.querySelector(".read-later");

    let feedData;
    let currentView = "home";
    let latestUrl;

    let readLaterArray = [];

    const feedRenderer = new FeedRenderer(feedContainer);
    const feedSorter = new FeedSorter();
    const feedManager = new FeedManager();

    window.addEventListener("hashchange", routeChangeHandler);

    form.addEventListener("submit", getContentFromBackend);

    // Handle clicks on sort by published date
    navSortByPublished.addEventListener("click", () => {
        const sortedArray = feedSorter.sortByDate(feedData.arrayOutput);
        feedRenderer.renderReadLaterFeed(sortedArray);
    });

    // Handle clicks on refresh button
    navRefresh.addEventListener("click", async () => {
        if (!latestUrl) {
            urlInput.focus();
            urlInput.value = "No feed to refresh!";

            setTimeout(() => (urlInput.value = ""), 2000);
            return;
        } else {
            feedData = await feedManager.refreshFeed(latestUrl);
            window.location.hash = "#/home";
            feedRenderer.renderHomeFeed(feedData);
        }
    });

    navReadLaterHome.addEventListener("click", () => {
        window.location.hash =
            currentView === "home" ? "#/read-later" : "#/home";
    });

    function routeChangeHandler() {
        const route = window.location.hash;

        if (route === "#/read-later") {
            currentView = "read-later";
            navReadLaterHome.textContent = "Home";
            feedRenderer.renderReadLaterFeed(readLaterArray);
        } else {
            currentView = "home";
            navReadLaterHome.textContent = "Read later";
            feedRenderer.renderHomeFeed(feedData);
        }
    }

    /** TODO: Should also be broken out to FeedManager.js?
     * Handles form submission to fetch and render a feed from the given URL.
     *
     * Sends the URL submitted by the user to the backend for processing and validation.
     * Receives the processed data which is then rendered on the frontend.
     *
     * @param {*} event the form submission event.
     */
    async function getContentFromBackend(event) {
        event.preventDefault();

        if (urlInput.value === "") {
            urlInput.focus();
            urlInput.value = "No URL provided!";

            setTimeout(() => (urlInput.value = ""), 2000);
        } else {
            const data = await feedManager.fetchFeed(urlInput.value);

            // Store fetched data for later, mainly the `arrayOutput`
            feedData = data;
            latestUrl = urlInput.value;
            window.location.hash = "#/home";
            feedRenderer.renderHomeFeed(feedData);
        }
    }
});
