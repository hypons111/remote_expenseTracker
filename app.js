const port = process.env.PORT || 3000
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodPar = require('body-parser')
// const metOve = require('method-override')
const routes = require('./routes')
require('./config/mongoose')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodPar.urlencoded({ extended: true }))
// app.use(metOve('_method'))
app.use(routes)


app.listen(port, () => {
  console.log(`This app is running on http://localhost${port}`)
})