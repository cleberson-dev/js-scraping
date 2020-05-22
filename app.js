const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const filename = 'teams.json';

async function main() {
  // A quantidade de partidas foi obtida manualmente (TODO: Obter automaticamente)
  for (let i = 0; i < 52976; i += 100) {
    // Usando a página de resultados de partidas onde informações do nome do time do site estão disponíveis
    const url = `https://www.hltv.org/results?offset=${i}`;
    
    console.log(`[${new Date().toUTCString()}] Scraping: ${url}`);

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let newTeams = $('td.team-cell div.team');
    newTeams = Array.from(newTeams);
    newTeams = newTeams.map(team => team.children[0].data);
    newTeams = [... new Set(newTeams)];

    await persist(newTeams, filename);

    console.log(`Successfully extracted ${newTeams.length} new teams.`);
  }

  // Os dados persistidos no arquivo não fecham a array com ']'
  fs.appendFile(filename, ']', (err) => {
    if (err) console.error(err);
  });
}

async function persist(arr, filename) {
  const filepath = path.join(__dirname, filename);
  let stringifiedArray = JSON.stringify(arr).slice(0, -1);
  
  if (!fs.existsSync(filepath)) {
    return fs.createWriteStream(filepath).write(stringifiedArray);
  }

  fs.appendFile(filepath, stringifiedArray.replace('[', ','), (err) => {
    if (err) console.error(err);
  });
}

main();