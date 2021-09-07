require('dotenv').config()

const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
  
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Ficha.html'))
})

app.get('/Shared/ListaMagias.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Shared/ListaMagias.html'))
})

app.get('/javascript/jquery.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'javascript/jquery.js'))
})

app.get('/javascript/FileSaver.min.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'javascript/FileSaver.min.js'))
})

app.get('/javascript/Ajax.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'javascript/Ajax.js'))
})

app.get('/javascript/listaMagias.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'javascript/listaMagias.js'))
})

app.get('/imgs/icon-atk-I-peq.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'imgs/icon-atk-I-peq.png'))
})

app.get('/imgs/icon-blk-II-peq.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'imgs/icon-blk-II-peq.png'))
})

app.get('/imgs/icon-bowArrow-I-peq.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'imgs/icon-bowArrow-I-peq.png'))
})

app.get('/imgs/icon-dodge-III-peq.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'imgs/icon-dodge-III-peq.png'))
})

app.get('/imgs/icon-Information-I-peq.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'imgs/icon-Information-I-peq.png'))
})

app.get('/imgs/icon-blk-II-peq.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'imgs/icon-blk-II-peq.png'))
})

app.get('/imgs/icon-MagicHand-I-peq.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'imgs/icon-MagicHand-I-peq.png'))
})

app.get('/imgs/icon-Armor-I-peq.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'imgs/icon-Armor-I-peq.png'))
})

app.get('/imgs/icon-MagicBook-I-peq.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'imgs/icon-MagicBook-I-peq.png'))
})

app.get('/imgs/icon-MagicShield-I-peq.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'imgs/icon-MagicShield-I-peq.png'))
})

app.get('/imgs/icon-MagicBook-I-peq.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'imgs/icon-MagicBook-I-peq.png'))
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})