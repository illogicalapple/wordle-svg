const express = require("express")
const axios = require("axios")
const sharp = require("sharp")
const app = express()
const port = 3000

app.get("/:letter/:position.png", (req, res) => {
  var date = new Date(Date.now())
  var url = `https://www.nytimes.com/svc/wordle/v2/${date.toISOString().split('T')[0]}.json`
  axios.get(url).then(response => response.data).then(data => {
    var color = "#3a3a3c"
    if(req.params.letter == data.solution[Number(req.params.position-1)]) {
      color="#538d4e"
    } else if(data.solution.includes(req.params.letter)) {
      color="#b59f3b"
    }
    sharp(Buffer.from(`<svg width="64" height="68" viewBox="0 0 64 68" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="2" width="64" height="64" fill="${color}"/>
</svg>`)).png().toBuffer().then(d=>{
    res.set("Access-Control-Allow-Origin","*")
    res.set("Cross-Origin-Resource-Policy", "cross-origin")
    res.setHeader('Content-Type', 'image/png');
    res.send(d)
})
})})

app.listen(port);
