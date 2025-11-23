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
    sharp(Buffer.from(`<svg width="64" height="68" viewBox="0 0 64 68" fill="none" xmlns="http://www.w3.org/2000/svg"><style>
@font-face {
  font-family: 'OpenSans';
  font-style: italic;
  font-weight: 300 800;
  font-stretch: 100%;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/opensans/v44/memtYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWqWuU6F.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>
<rect y="2" width="64" height="64" fill="${color}"/>
<text x="32" y="50" text-anchor="middle" font-family="OpenSans" font-size="48" font-weight="bold" fill="white">${req.params.letter.toUpperCase()}</text>
</svg>`)).png().toBuffer().then(d=>{
    res.set("Access-Control-Allow-Origin","*")
    res.set("Cross-Origin-Resource-Policy", "cross-origin")
    res.setHeader('Content-Type', 'image/png');
    res.send(d)
})
})})

app.listen(port);
