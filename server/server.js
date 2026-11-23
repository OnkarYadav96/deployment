const express = require('express');
const cors = require('cors');
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

const __filename=fileURLToPath(import .meta.url)
const __dirname=path.dirname(__filename)
const publicDir=path.join(__dirname,'public')

// Enable CORS so the React app can access this server
app.use(cors());

// Middleware to parse JSON payloads
app.use(express.json());
app.use(express.static(publicDir))

// Dummy API endpoint returning static data
app.get('/api/message', (req, res) => {
  res.json({ text: 'Hello from the Express server!' });
});

app.get('/api/items', (req, res) => {
  res.json([{id:1,name:"Item One"},{id:2,name:"Item Two"},{id:3,name:"Item Three"},] );
});

// Controller use to attend req WITHOUT "/API" Req
// Wildcard API
app.get("*name", (req, res) => {
  res.sendFile(path.join(publicDir,'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
