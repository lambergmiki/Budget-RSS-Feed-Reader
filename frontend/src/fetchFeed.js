// Use environment base URL based on mode
const backendBaseUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch feed data from the backend for a given URL.
 * Assigns a `read` property to each article.
 *
 * @param {string} url RSS URL to process
 * @returns {Promise<{ htmlOutput: string, arrayOutput: Array }>} Feed data
 */
export async function fetchFeed(url) {
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
