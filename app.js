const cheerio = require('cheerio');
const axios = require('axios');



const url = 'https://www.hltv.org/results';

axios
  .get(url)
  .then(scrape)
  .catch(console.error);

function scrape({ data }) {
  const $ = cheerio.load(data);
  let teams = $('td.team-cell div.team');
  teams = Array.from(teams);
  teams = [...new Set(teams.map(team => team.children[0].data))];

  teams.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
  console.log(teams);
}