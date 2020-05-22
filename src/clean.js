const fs = require('fs');
const path = require('path');

module.exports = (filename) => {
  const filepath = path.join(process.cwd(), filename);

  const data = fs.readFileSync(filepath);
  const arr = JSON.parse(data.toString());

  const filteredArray = [...new Set(arr)];
  const stringifiedArray = JSON.stringify(filteredArray);
  
  fs.writeFileSync(filepath, stringifiedArray); 
}