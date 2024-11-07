const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/time',(req,res) =>{
  res.send(Date());
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })