require('dotenv').config()
const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!') //
})


app.get('/twitter', (req, res) => {
  res.send('Adithi G Urs!')
})

app.get('/login', (req, res) => {
  res.send('<h1>please login</h1>')
})

app.get('/youtube', (req, res) => {
  res.send('<h2>i am h2 in youtube</h2>')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
  
})

// instead of sending a string we can also send an Array of Objects
// res.send([{id: 1, name: 'Adithi'}, {id: 2, name: 'Urs'}])
