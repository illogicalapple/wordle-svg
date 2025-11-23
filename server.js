// lol if anyone is looking at this the code is beautiful idk what you're talking about'

const express = require("express")
const axios = require("axios")
const app = express()
const port = 1234

app.get("/:letter/:position.svg", (req, res) => {
  var date = new Date(Date.now())
  var url = `https://www.nytimes.com/svc/wordle/v2/${date.toISOString().split('T')[0]}.json`
  axios.get(url).then(response => response.data).then(data => {
    var color = "#3a3a3c"
    if(req.params.letter == data.solution[Number(req.params.position-1)]) {
      color="#538d4e"
    } else if(data.solution.includes(req.params.letter)) {
      color="#b59f3b"
    }
    res.send(`<svg width="64" height="68" viewBox="0 0 64 68" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="2" width="64" height="64" fill="${color}"/>
<text x="32" y="50" text-anchor="middle" font-family="Arial" font-size="48" font-weight="bold" fill="white">${req.params.letter.toUpperCase()}</text>
</svg>`)
}
})

app.listen(port, ()=>{})
