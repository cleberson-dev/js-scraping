const chalk = require('chalk');

module.exports = {
  pageScrapingStarted(url) {
    const date = new Date().toUTCString();
    console.log(`${chalk.bgBlue(date)} Scraping: ${url}...`);
  },
  pageScrapingEnded({ teamsExtracted, pageScrapingDuration }) {
    pageScrapingDuration = `[${pageScrapingDuration}s]`;
    teamsExtracted = chalk.underline(`${teamsExtracted} teams`);
    console.log(`Successfully extracted ${teamsExtracted}. ${pageScrapingDuration} \n`);
  },
  completed({ pagesScraped, scrapingDuration, totalTeamsExtracted }) {
    const completedMessage = 'Extraction Completed';
    const durationTitleUnderlined = chalk.bold('Duration');
    const teamsExtractedTitleUnderlined = chalk.bold('Teams extracted'); 
    
    console.log(chalk.bgGreen(completedMessage));
    console.log(`${durationTitleUnderlined}: ${scrapingDuration / 1000}s (${((scrapingDuration / pagesScraped) / 1000).toFixed(2)}s per page)`);
    console.log(`${teamsExtractedTitleUnderlined}: ${totalTeamsExtracted} teams (${totalTeamsExtracted / pagesScraped} per page)`);
  }
};