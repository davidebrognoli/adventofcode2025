const fs = require('fs');
const path = require('path');

// Prendi il nome del giorno come parametro dalla riga di comando
const day = process.argv[2];

// Funzione per caricare ed eseguire il codice per un giorno specifico
function runDay(day) {
  const dayPath = path.resolve(__dirname, `src/day${day}/index.js`);

  if (fs.existsSync(dayPath)) {
    require(dayPath); // Esegui il codice del giorno specifico
  } else {
    console.error(`Day ${day} script not found.`);
  }
}

// Esegui il codice del giorno
if (day) {
  runDay(day);
} else {
  console.log('Please provide a day number (e.g. npm start day1)');
}
