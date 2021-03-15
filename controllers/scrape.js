const axios = require('axios');
const { sendToGit } = require('./git');
var fs = require("fs");
const cheerio = require('cheerio');

exports.scrapeData = async () => {
    // Make a request for a user with a given ID
    axios.get('https://store.steampowered.com/stats/').then(function (response) {
        // handle success
        console.log("Found some!");
        const $ = cheerio.load(response.data);
        const trs = $('#detailStats > table > tbody > tr').toArray();
        const dataArray = [];
        trs.forEach((tr, idx) => {
          if(idx > 1){
            let tds = tr.children.filter(item => !!item.name && item.name === "td");
            let spans = [];
            let anchors = [];
            tds.forEach((td) => {
              let span = td.children.filter(item => !!item.name && item.name === "span");
              let anchor = td.children.filter(item => !!item.name && item.name === "a");
              if(!!anchor && !!anchor.length) {
                anchors.push(anchor[0]);
              }
              if(!!span && !!span.length) {
                spans.push(span[0]);
              }
              
            });
            dataArray.push({
                name: anchors[0].children[0].data,
                link: anchors[0].attribs.href,
                currentPlayers: spans[0].children[0].data,
                peakPlayers: spans[1].children[0].data,
                lastUpdated: new Date().toLocaleString(),
            });
          }
          
        });
      
        const jsonContent = JSON.stringify(dataArray);
        sendToGit(jsonContent);
        
      
        fs.writeFile("./top100.json", jsonContent, 'utf8', function (err) {
          if (err) {
              return console.log(err);
          }
      
          console.log("Saved the new file!");
        }); 
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
}
