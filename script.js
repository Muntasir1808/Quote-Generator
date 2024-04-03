// populating quotes on UI (make sure that id matches)
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    // when our loader is going, we're only going to see the loader and nothing else
    quoteContainer.hidden = true;
}
// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// show new Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // check if author field is blank and replace it with 'Unknown'
    if (!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
// An asynchronous function can run at any time independently and it won't stop the browser from completing the loading of the page
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    // try catch allows to attempt to complete a fetch request but if it doesn't work, we can catch the error information and do something with it
    try {
        const response = await fetch(apiUrl);
        // in the above line, we're getting the json from our API as a response, and in the below line we're turning that response in the json object
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        // catch the error

    }

}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // open twitterUrl window in a new tab
    window.open(twitterUrl, '_blank');
}

// to make buttons work we need eventListener these should at the bottom because we want to declare our function before we call it.
// Event Listeners
// 'click' means we want to target a click event
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// as soon as the page loads we want to run getQuotes
// On Load
getQuotes();