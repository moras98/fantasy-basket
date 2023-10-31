const puppeteer = require('puppeteer');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');


//Variables
const game_id = 9;
const game_url = 'https://fibalivestats.dcd.shared.geniussports.com/u/FUBB/2369859/bs.html';

const teamsData = (async () => {
  const browser = await puppeteer.launch({ headless: true, waitForInitialPage: true });
  const page = await browser.newPage();

  // Navega a la página web que deseas analizar
  await page.goto(game_url);

  // Selector que apunta a todas las filas de la tabla con la clase "player-row"
  const rowsSelector = 'table tr.player-row';

  // Obtiene el texto de todos los spans dentro de cada fila de la tabla
  const data = await page.evaluate((selector) => {
    const rows = Array.from(document.querySelectorAll(selector));
    const result = [];

    rows.forEach((row) => {
        const spans = Array.from(row.querySelectorAll('span'));
        const selectedSpans = [spans[1], spans[5], spans[6], spans[13], spans[19], spans[20], spans[22], spans[23], spans[24], spans[25]].map((span) =>
          span ? span.textContent.trim() : ''
        );
  
        // Agregar los spans seleccionados a la matriz de resultados
        result.push(selectedSpans);
      });

    return result;
  }, rowsSelector);

  data.shift()

  // Cierra el navegador
  await browser.close();
  return data;
})();

const csvWriter = createObjectCsvWriter({
    path: `game_stats/game${game_id}_stats.csv`,
    header: [
      { id: 'game_id', title: 'game_id' },
      { id: 'name', title: 'player_id' },
      { id: 'time_played', title: 'time_played' },
      { id: 'points_scored', title: 'points_scored' },
      { id: 'threes_scored', title: 'threes_scored' },
      { id: 'off_rebounds', title: 'off_rebounds' },
      { id: 'def_rebounds', title: 'def_rebounds' },
      { id: 'assists', title: 'assists' },
      { id: 'losts', title: 'losts' },
      { id: 'steals', title: 'steals' },
      { id: 'blocks', title: 'blocks' },
    ],
  });


teamsData.then((data) => {
    const formattedData = data.map((row) => {
        return {
          game_id: game_id,
          name: row[0],
          time_played: row[1],
          points_scored: row[2],
          threes_scored: row[3],
          off_rebounds: row[4],
          def_rebounds: row[5],
          assists: row[6],
          losts: row[7],
          steals: row[8],
          blocks: row[9],
        };
      });
      
      csvWriter.writeRecords(formattedData)
        .then(() => console.log('CSV file written successfully'))
        .catch((err) => console.error(err));
})
