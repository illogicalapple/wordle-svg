import datetime
import requests
  
const express = require('express')
const app = express()
const port = 3000

var date = datetime.date.today()
var url = f"https://www.nytimes.com/svc/wordle/v2/{date:%Y-%m-%d}.json"
var solution = requests.get(url).json()["solution"]

app.get("/:letter/:position.svg", (req, res) => {
  res.send(solution)
  /*res.send(`<svg width="64" height="68" viewBox="0 0 64 68" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="2" width="64" height="64" fill="#565656"/>
<text x="32" y="50" text-anchor="middle" font-family="Arial" font-size="48" font-weight="bold" fill="white">C</text>
</svg>`)*/
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
