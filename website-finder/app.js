const sites = [
  {
    name: "MDN Web Docs",
    url: "https://developer.mozilla.org/",
    icon: "⌘",
    tags: ["learn programming", "coding", "web development", "javascript", "html", "css"],
    description: "Detailed, practical documentation for web technologies and programming."
  },
  {
    name: "freeCodeCamp",
    url: "https://www.freecodecamp.org/",
    icon: "⌁",
    tags: ["learn programming", "coding", "learn coding", "javascript", "python", "web development"],
    description: "Free interactive coding lessons and projects for learning by doing."
  },
  {
    name: "Coursera",
    url: "https://www.coursera.org/",
    icon: "C",
    tags: ["learn", "courses", "programming", "business", "school", "education"],
    description: "Online courses and professional certificates from universities and companies."
  },
  {
    name: "Amazon",
    url: "https://www.amazon.com/",
    icon: "A",
    tags: ["buy", "shopping", "buy shoes", "buy clothes", "electronics", "books"],
    description: "Large general marketplace for products across many categories."
  },
  {
    name: "eBay",
    url: "https://www.ebay.com/",
    icon: "e",
    tags: ["buy", "shopping", "used", "collectibles", "electronics", "clothes"],
    description: "Marketplace for new and pre-owned goods, auctions, and collectibles."
  },
  {
    name: "Etsy",
    url: "https://www.etsy.com/",
    icon: "E",
    tags: ["buy gifts", "handmade", "crafts", "jewelry", "decor", "clothes"],
    description: "Marketplace focused on handmade, vintage, and creative products."
  },
  {
    name: "Netflix",
    url: "https://www.netflix.com/",
    icon: "N",
    tags: ["watch movies", "watch shows", "movies", "tv", "series"],
    description: "Subscription streaming service for movies, series, and original productions."
  },
  {
    name: "Crunchyroll",
    url: "https://www.crunchyroll.com/",
    icon: "✦",
    tags: ["watch anime", "anime", "watch shows", "manga"],
    description: "Streaming and manga platform focused on anime and related content."
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/",
    icon: "▶",
    tags: ["watch videos", "movies", "learn", "music", "tutorials", "anime"],
    description: "Huge library of videos, tutorials, music, live streams, and more."
  },
  {
    name: "Canva",
    url: "https://www.canva.com/",
    icon: "✎",
    tags: ["make a presentation", "presentation", "design", "poster", "logo", "social media"],
    description: "Easy drag-and-drop tools for presentations, graphics, posters, and social posts."
  },
  {
    name: "Google Slides",
    url: "https://slides.google.com/",
    icon: "▤",
    tags: ["make a presentation", "presentation", "slides", "school", "work"],
    description: "Collaborative presentation editor that works in your browser."
  },
  {
    name: "Figma",
    url: "https://www.figma.com/",
    icon: "◈",
    tags: ["design", "ui", "ux", "prototype", "website design", "app design"],
    description: "Collaborative design and prototyping platform for digital products."
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/",
    icon: "♫",
    tags: ["listen music", "music", "songs", "podcasts"],
    description: "Streaming service for music, playlists, podcasts, and audio."
  },
  {
    name: "Google Flights",
    url: "https://www.google.com/travel/flights",
    icon: "✈",
    tags: ["find flights", "flights", "travel", "airplane", "cheap flights"],
    description: "Flight search with flexible dates, destinations, and price comparisons."
  },
  {
    name: "Booking.com",
    url: "https://www.booking.com/",
    icon: "B",
    tags: ["find hotels", "hotel", "travel", "vacation", "book hotel"],
    description: "Search and compare hotels, apartments, and other accommodations."
  },
  {
    name: "GitHub",
    url: "https://github.com/",
    icon: "⌂",
    tags: ["code", "programming", "github", "projects", "open source", "developer"],
    description: "Platform for hosting code, collaborating on projects, and open source."
  },
  {
    name: "Google Scholar",
    url: "https://scholar.google.com/",
    icon: "G",
    tags: ["research", "papers", "science", "academic", "study"],
    description: "Search engine for scholarly literature, papers, theses, and citations."
  },
  {
    name: "Wikipedia",
    url: "https://www.wikipedia.org/",
    icon: "W",
    tags: ["research", "learn", "information", "history", "facts"],
    description: "Free encyclopedia for quick background information and references."
  }
];

const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const results = document.getElementById("results");

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function scoreSite(site, query) {
  const q = normalize(query);
  const words = q.split(" ").filter(Boolean);
  const tagText = site.tags.map(normalize);
  let score = 0;

  for (const tag of tagText) {
    if (tag === q) score += 12;
    if (tag.includes(q) && q.length > 2) score += 6;
    for (const word of words) {
      if (tag.split(" ").includes(word)) score += 2;
      else if (tag.includes(word) && word.length > 2) score += 1;
    }
  }

  const name = normalize(site.name);
  if (name.includes(q)) score += 10;

  return score;
}

function getMatches(query) {
  return sites
    .map(site => ({ site, score: scoreSite(site, query) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(item => item.site);
}

function render(query) {
  const matches = getMatches(query);
  const safeQuery = encodeURIComponent(query);

  if (!matches.length) {
    results.innerHTML = `
      <div class="no-results">
        <strong>No curated matches yet.</strong>
        <div>Try a broader phrase like “shopping”, “learning”, “movies”, or “design”.</div>
        <div class="web-search">
          <a href="https://www.google.com/search?q=${safeQuery}" target="_blank" rel="noopener noreferrer">
            Search the web for “${escapeHtml(query)}” ↗
          </a>
        </div>
      </div>`;
    return;
  }

  results.innerHTML = `
    <div class="results-heading">
      <h2>Suggested websites</h2>
      <p>Based on “${escapeHtml(query)}”</p>
    </div>
    <div class="result-grid">
      ${matches.map(site => `
        <article class="result">
          <div class="result-top">
            <div class="result-icon" aria-hidden="true">${site.icon}</div>
            <div>
              <h3>${escapeHtml(site.name)}</h3>
              <div class="url">${escapeHtml(site.url.replace("https://", ""))}</div>
            </div>
          </div>
          <p>${escapeHtml(site.description)}</p>
          <a href="${site.url}" target="_blank" rel="noopener noreferrer">Visit website ↗</a>
        </article>`).join("")}
    </div>
    <div class="web-search">
      <a href="https://www.google.com/search?q=${safeQuery}" target="_blank" rel="noopener noreferrer">
        Want more? Search the web ↗
      </a>
    </div>`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) {
    input.focus();
    return;
  }
  render(query);
  results.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

input.addEventListener("input", () => {
  clearBtn.hidden = !input.value;
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  clearBtn.hidden = true;
  results.innerHTML = "";
  input.focus();
});

document.querySelectorAll("[data-query]").forEach(button => {
  button.addEventListener("click", () => {
    input.value = button.dataset.query;
    clearBtn.hidden = false;
    render(button.dataset.query);
    results.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});