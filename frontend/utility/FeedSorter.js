export class FeedSorter {
    /**
     * Reverses the array, simulating sorting by ascending/descending order,
     * since array is sorted most recent -> oldest (descending) beforehand.
     */
    sortByDate(feedAsArray) {
        if (feedAsArray === undefined) {
            urlInput.focus();
            urlInput.value = "No feed to sort!";

            setTimeout(() => (urlInput.value = ""), 2000);
        } else {
            feedAsArray.reverse();
            return feedAsArray;
        }
    }
}
