// Set the URL for API endpoint: latest prices at 14.00 EET or 15.00 at summer
const LATEST_PRICES_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json';

/* Create a promise for reading data from the API in the background
 and return it as json when ready */
async function fetchLatestPriceData() {
    const response = await fetch(LATEST_PRICES_ENDPOINT);
    const json = await response.json()
    return json;
}

module.exports = {
    fetchLatestPriceData
}