export class FeedRenderer {
    constructor(feedContainer) {
        this.feedContainer = feedContainer;
    }

    /**
     * Renders the home view.
     *
     * @param {Object} feedData - the data object, containing a raw, unstyled feed as a HTML string,
     * and an array of objects (articles).
     */
    renderHomeFeed(feedData) {
        const mappedHtml = feedData.arrayOutput
            .map(
                (article) =>
                    `<div>${article?.author}</div><div><a class="text-xl underline underline-offset-1" href="${article?.link}" target="_blank">${article.title}</a></div><div>${article?.published}</div><button class="border-2 p-1 mt-2">Read later</button><br></br>`
            )
            .join("");

        this.feedContainer.innerHTML = mappedHtml;
    }

    /**
     * Renders the read later view.
     *
     * @param {Array<Object>} readLaterArray - Array of saved articles. They do not persist.
     */
    renderReadLaterFeed(readLaterArray) {
        if (readLaterArray.length > 0) {
            const mappedHtml = readLaterArray
                .map(
                    (article) =>
                        `<div>${article?.author}</div><div><a class="text-xl underline underline-offset-1" href="${article?.link}" target="_blank">${article.title}</a></div><div>${article?.published}</div><button class="border-2 p-1 mt-2">Read later</button><br></br>`
                )
                .join("");

            this.feedContainer.innerHTML = mappedHtml;
        } else {
            this.feedContainer.innerHTML = `<p class="text-gray-600 italic">You have not saved any articles yet :(</p>`;
        }
    }
}
