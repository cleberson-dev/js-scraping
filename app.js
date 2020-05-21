const cheerio = require('cheerio');
const axios = require('axios');



async function main() {
  const teams = [];
  // A quantidade de partidas foi obtida manualmente (TODO: Obter automaticamente)
  for (let i = 0; i < 52976; i += 100) {
    // Usando a página de resultados de partidas onde informações do nome do time do site estão disponíveis
    let url = `https://www.hltv.org/results?offset=${i}`;
    
    console.log(`Scraping: ${url}`);

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    let newTeams = $('td.team-cell div.team');
    
    newTeams = Array.from(newTeams);
    newTeams = newTeams.map(team => team.children[0].data);
    
    const oldTeamsLength = teams.length;
    teams.push(...newTeams);
    const newTeamsLength = teams.length;
    const newTeamsAdded = newTeamsLength - oldTeamsLength;

    console.log(`Successfully extracted ${newTeamsAdded} new teams.`);
  }

  teams.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
  console.log(teams);
}

main();