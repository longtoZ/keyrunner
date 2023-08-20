const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 2903

app.use('/', express.static(path.join(__dirname, 'public'))) // server public files

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile('./views/index.html', {root: __dirname})
})

app.get('/setting(.html)?', (req, res) => {
    res.sendFile('./views/setting.html', {root: __dirname})
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})