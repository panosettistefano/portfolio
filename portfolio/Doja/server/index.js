const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // Importiamo il driver mysql

const app = express();
const PORT = 3000;

// Configurazione CORS più permissiva per lo sviluppo
app.use(cors({
    origin: '*', // Accetta richieste da CHIUNQUE (solo per sviluppo)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// 1. Configuriamo la connessione al Database
const db = mysql.createConnection({
  host: 'localhost',     // Il database è sul tuo computer
  user: 'root',          // Di solito l'utente base è 'root'
  password: 'toor', // <--- SCRIVI QUI LA TUA PASSWORD DI MYSQL
  database: 'doja_db' // Il database che abbiamo appena creato
});

// 2. Proviamo a connetterci subito
db.connect((err) => {
  if (err) {
    console.error('❌ Errore di connessione al DB:', err.message);
    return;
  }
  console.log('✅ Connesso a MySQL con successo!');
});

// Rotta di prova
app.get('/', (req, res) => {
  res.send('Backend connesso al Database!');
});

// --- ROTTA API AGGIORNATA ---
app.get('/api/portfolio', (req, res) => {
  // Ora selezioniamo dalla tabella 'assets'
  const sql = "SELECT * FROM assets";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Errore SQL:", err);
      res.status(500).send("Errore nel server");
      return;
    }
    res.json(results);
  });
});

// AGGIUNGI QUESTA PARTE PER SALVARE NUOVE OPERE
app.post('/api/assets', (req, res) => {
    const { artist, title, price, year, status, img, description } = req.body;
    const sql = "INSERT INTO assets (artist, title, price, year, status, img, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [artist, title, price, year, status, img, description], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Errore nel salvataggio");
        } else {
            res.send("Salvato con successo");
        }
    });
});

app.listen(PORT, () => {
  console.log(`🚀 Server acceso su http://localhost:${PORT}`);
});