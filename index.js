const { scrapeData } = require('./controllers/scrape');

// setInterval(() => {
  console.log("Scraping more...");
  scrapeData();
// }, 300000);
