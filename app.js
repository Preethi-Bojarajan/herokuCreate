const express = require('express')
const app = express()
const port = 6070
const { Client } = require('pg');
const https = require('https');
const fs = require('fs');

var privateKey = fs.readFileSync('server.key');
var certificate = fs.readFileSync('server.cert');

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://ec2-3-215-76-208.compute-1.amazonaws.com:5432/dt6te591fbq0u?sslmode=require&user=akrjmqrmrkrlio&password=2d7add6814d2a5fca097ff38b1bb5b8ec6902b186f36beede1af788011d6129d',
  ssl: process.env.DATABASE_URL ? true : false,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const httpsServer = https.createServer({
  key: privateKey,
  cert: certificate
}, app);

httpsServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
