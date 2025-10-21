// Use environment base URL based on mode
const backendBaseUrl = import.meta.env.VITE_API_BASE_URL;

export class FeedManager {
    /**
     * Fetch feed data from the backend for a given URL.
     * Assigns a `read` property to each article.
     *
     * @param {string} url RSS URL to process
     * @returns {Promise<{ htmlOutput: string, arrayOutput: Array }>} Feed data
     */
    async fetchFeed(url) {
        const res = await fetch(`${backendBaseUrl}/processUrl`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ parcel: url }),
        });

        // data is the output as an object, { htmlOutput: '<div>...', arrayOutput: [..., ...] }
        const data = await res.json();

        // Assign a "read" property to each article (default false)
        for (const article of data.arrayOutput) {
            article.read = false;
        }

        return data;
    }

    // Fetches the latest submitted URL, navigates back to home view and "refreshes" (renders) that feed TODO: fix
    /**
     * Refreshes the feed by re-fetching data for the provided URL.
     * Throws an error if no URL is provided.
     *
     * @param {string} url - The URL to refresh the feed from.
     * @returns {Promise<{ htmlOutput: string, arrayOutput: Array }>} The refreshed feed data.
     * @throws {Error} If no URL is provided.
     */
    async refreshFeed(url) {
        if (!url) {
            throw new Error("No feed to refresh");
        }
        return this.fetchFeed(url);
    }
}
