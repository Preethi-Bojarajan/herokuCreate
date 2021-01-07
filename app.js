const express = require('express')
const app = express()
const port = 6070
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:priti7pg@localhost:5432/postgres',
    ssl: process.env.DATABASE_URL ? true : false
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


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
 
  app.get("/abcd", function(req,res){
      res.send('abcd');
  });
  app.get('/abc*',function(req,res){
    res.send('abc*');
});