let quotes = [
    {quote: "What great thing would you attempt, if you knew you could not fail.", author: "Robert H. Schuller"},
    {quote: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau"},
    {quote: "If you are not willing to risk the usual, you will have to settle for the ordinary.", author: "Jim Rohn"},
    {quote: "Think of what you have rather than of what you lack. Of the things you have, select the best and then reflect how eagerly you would have sought them if you did not have them.", author: "Marcus Aurelius"},
    {quote: "You have to be burning with an idea, or a problem, or a wrong that you want to right. If you're not passionate enough from the start, you'll never stick it out.", author: "Steve Jobs"},
    {quote: "A man who wants to lead the orchestra must turn his back on the crowd.", author: "Max Lucado"},
    {quote: "You only have to do a very few things right in your life so long as you don't do too many things wrong.", author: "Warren Buffett"},
    {quote: "Some men have thousands of reasons why they cannot do what they want to, when all they need is one reason why they can.", author: "Martha Graham"},
    {quote: "Whatever the situation, just take it for what it is. You don't have to make it worse or better than it is. It just is what it is. Always deal with the honesty, the truth of what something is, and then you've got all kinds of choices.", author: "Michael J. Fox"},
    {quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein"},
    {quote: "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.", author: "Bernard M. Baruch"},
    {quote: "The supreme art of war is to subdue the enemy without fighting.", author: "Sun Tzu"},
]


function genQuote(quoteList, quoteElem, authorElem){
    let selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElem.parentElement.style.animationName = "quoteCollapse";
    quoteElem.parentElement.style.animationDuration = ".7s";
    quoteElem.parentElement.onanimationend = () => quoteElem.parentElement.style.animationName = "";
    quoteElem.parentElement.onanimationstart = () => {
        quoteElem.innerText = `"${selectedQuote.quote}"`;
        authorElem.innerText = `- ${selectedQuote.author}`;
    }
}

let quoteOutput = document.getElementById("quote"),
    authorOutput = document.getElementById("author");
genQuote(quotes, quoteOutput, authorOutput);

document.getElementById("regen").onclick = () => {
    genQuote(quotes, quoteOutput, authorOutput);
}