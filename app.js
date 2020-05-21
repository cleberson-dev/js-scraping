const cheerio = require('cheerio');
const axios = require('axios');



async function main() {
  let url = 'https://www.hltv.org/results';
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);
  let teams = $('td.team-cell div.team');
  
  teams = Array.from(teams);
  teams = [...new Set(teams.map(team => team.children[0].data))];
  teams.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
}

main();