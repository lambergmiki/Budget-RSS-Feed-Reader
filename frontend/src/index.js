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

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const url = urlInput.value;

        if (!url) {
            urlInput.focus();
            urlInput.value = "No URL provided!";
            setTimeout(() => (urlInput.value = ""), 2000);
            return;
        }

        feedData = await feedManager.handleUrlSubmit(url);
        latestUrl = url;

        window.location.hash = "#/home";
        feedRenderer.renderHomeFeed(feedData);
    });

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
});
