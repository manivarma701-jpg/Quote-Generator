// ============================
// QUOTE GENERATOR — LOGIC
// ============================

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", tags: ["motivation","work"] },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein", tags: ["mindset","challenge"] },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", tags: ["persistence"] },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", tags: ["life"] },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", tags: ["dreams","future"] },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein", tags: ["success","values"] },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky", tags: ["action","motivation"] },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford", tags: ["mindset"] },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", tags: ["action","time"] },
  { text: "An unexamined life is not worth living.", author: "Socrates", tags: ["philosophy","life"] },
  { text: "Spread love everywhere you go.", author: "Mother Teresa", tags: ["love","kindness"] },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt", tags: ["perseverance"] },
  { text: "Always remember that you are absolutely unique, just like everyone else.", author: "Margaret Mead", tags: ["humor","self"] },
  { text: "Do not go where the path may lead; go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson", tags: ["courage","originality"] },
  { text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou", tags: ["resilience"] },
];

// DOM
const quoteText   = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const tagContainer= document.getElementById('tagContainer');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const copyBtn     = document.getElementById('copyBtn');
const tweetBtn    = document.getElementById('tweetBtn');
const currentIdx  = document.getElementById('currentIdx');
const totalCount  = document.getElementById('totalCount');

let index = 0;

// ── Display a quote ───────────────────────────────────────────────────────────
function displayQuote(i) {
  const q = quotes[i];

  // Fade out
  quoteText.classList.add('fade-out');
  quoteAuthor.classList.add('fade-out');

  setTimeout(() => {
    quoteText.textContent   = q.text;
    quoteAuthor.textContent = `— ${q.author}`;
    currentIdx.textContent  = i + 1;

    // Tags
    tagContainer.innerHTML = q.tags
      .map(t => `<span class="tag">${t}</span>`)
      .join('');

    // Tweet link
    const tweet = encodeURIComponent(`"${q.text}" — ${q.author}`);
    tweetBtn.href = `https://twitter.com/intent/tweet?text=${tweet}`;

    // Fade in
    quoteText.classList.remove('fade-out');
    quoteAuthor.classList.remove('fade-out');
  }, 300);
}

// ── Next random quote (no repeat) ────────────────────────────────────────────
function nextQuote() {
  let next;
  do { next = Math.floor(Math.random() * quotes.length); } while (next === index);
  index = next;
  displayQuote(index);
}

// ── Copy ──────────────────────────────────────────────────────────────────────
copyBtn.addEventListener('click', () => {
  const text = `"${quotes[index].text}" — ${quotes[index].author}`;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = '✅ Copied!';
    setTimeout(() => copyBtn.textContent = '📋 Copy', 2000);
  });
});

// ── Init ──────────────────────────────────────────────────────────────────────
totalCount.textContent = quotes.length;
displayQuote(0);
newQuoteBtn.addEventListener('click', nextQuote);
