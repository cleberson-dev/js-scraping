const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const logger = require('./logger');
const clean = require('./clean');

main();



async function main() {
  const filename = 'teams.json';

  const stats = {
    scrapingStart: Date.now(),
    teamsExtracted: [],
    pagesScraped: 0
  };

  // A quantidade de partidas foi obtida manualmente (TODO: Obter automaticamente)
  for (let i = 0; i < 1000; i += 100) {
    // Usando a página de resultados de partidas onde informações do nome do time do site estão disponíveis
    const url = `https://www.hltv.org/results?offset=${i}`;
    const pageScrapingStart = Date.now();

    logger.pageScrapingStarted(url);

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let newTeams = $('td.team-cell div.team');
    newTeams = Array.from(newTeams);
    newTeams = newTeams.map(team => team.children[0].data);
    newTeams = [... new Set(newTeams)];

    await persist(newTeams, filename);
    
    stats.teamsExtracted.push(newTeams.length);
    stats.pagesScraped += 1;

    const pageScrapingEnd = Date.now();
    const pageScrapingDuration = ((pageScrapingEnd - pageScrapingStart) / 1000).toFixed(2);

    logger.pageScrapingEnded({ teamsExtracted: newTeams.length, pageScrapingDuration });
  }

  stats.scrapingEnd = Date.now();
  stats.scrapingDuration = stats.scrapingEnd - stats.scrapingStart;
  stats.totalTeamsExtracted = stats.teamsExtracted.reduce((prev, cur) => prev + cur, 0);

  logger.completed({
    pagesScraped: stats.pagesScraped, 
    scrapingDuration: stats.scrapingDuration, 
    totalTeamsExtracted: stats.totalTeamsExtracted 
  });

  // Os dados persistidos no arquivo não fecham a array com ']'
  fs.appendFileSync(filename, ']', (err) => {
    if (err) console.error(err);
  });

  clean(filename);
}

async function persist(arr, filename) {
  const filepath = path.join(process.cwd(), filename);
  let stringifiedArray = JSON.stringify(arr).slice(0, -1);
  
  if (!fs.existsSync(filepath)) {
    return fs.createWriteStream(filepath).write(stringifiedArray);
  }

  fs.appendFileSync(filepath, stringifiedArray.replace('[', ','), (err) => {
    if (err) console.error(err);
  });
}