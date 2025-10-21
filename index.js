// Basic Express server for Greenfield Life RP
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'data');

app.use('/static', express.static(path.join(__dirname, 'public')));

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Simple API: list ministries
app.get('/api/ministries', (req, res) => {
  const p = path.join(DATA_DIR, 'ministries.json');
  fs.readFile(p, 'utf8', (err, raw) => {
    if (err) return res.status(500).json({ error: 'data read error' });
    res.type('application/json').send(raw);
  });
});

// API: get ministry by id
app.get('/api/ministries/:id', (req, res) => {
  const p = path.join(DATA_DIR, 'ministries.json');
  const id = req.params.id;
  fs.readFile(p, 'utf8', (err, raw) => {
    if (err) return res.status(500).json({ error: 'data read error' });
    const data = JSON.parse(raw);
    const found = data.find(m => String(m.id) === String(id));
    if (!found) return res.status(404).json({ error: 'not found' });
    res.json(found);
  });
});

// API: simulate login/register (very basic, for RP demo only)
app.post('/api/auth/login', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'username required' });
  // demo token (not secure) - in real project use proper auth
  res.json({ ok: true, token: 'demo-token-'+username, username });
});

// API: register a report (e.g., violation)
app.post('/api/report', (req, res) => {
  const body = req.body;
  const reportsFile = path.join(DATA_DIR, 'reports.json');
  const report = {
    id: Date.now(),
    created_at: new Date().toISOString(),
    ...body
  };
  let reports = [];
  try {
    if (fs.existsSync(reportsFile)) reports = JSON.parse(fs.readFileSync(reportsFile,'utf8'));
  } catch(e){}
  reports.unshift(report);
  fs.writeFileSync(reportsFile, JSON.stringify(reports,null,2), 'utf8');
  res.json({ ok: true, report });
});

// Admin-ish route: view reports (no auth implemented)
app.get('/api/reports', (req, res) => {
  const reportsFile = path.join(DATA_DIR, 'reports.json');
  let reports = [];
  try {
    if (fs.existsSync(reportsFile)) reports = JSON.parse(fs.readFileSync(reportsFile,'utf8'));
  } catch(e){}
  res.json(reports);
});

app.listen(PORT, () => {
  console.log('Greenfield Life RP server running on port', PORT);
});
