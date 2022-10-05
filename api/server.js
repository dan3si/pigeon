const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database/database')
const PORT = process.env.PORT || 80

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/addRoute', bodyParser.json(), (req, res) => {
    const route = {
      id: database.generateRouteId(),
      from: req.body.from,
      to: req.body.to,
      date: req.body.date,
      name: req.body.name,
      phone: req.body.phone
    }
  
    database.addRoute(route)

    res.send('success')
  })
  
app.get('/routes', (req, res) => {
    let routes = database.getRoutes()

    if (req.query.from !== '') {
      routes = routes.filter(route => route.from === req.query.from)
    }

    if (req.query.to !== '') {
      routes = routes.filter(route => route.to === req.query.to)
    }

    res.send(JSON.stringify(routes))
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

