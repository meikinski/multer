const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/schnee', (req, res) => {
  res.send('Hello Schnee!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
