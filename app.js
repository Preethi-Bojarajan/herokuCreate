const express = require('express')
const app = express()
const port = 6070

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