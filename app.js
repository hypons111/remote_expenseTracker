const port = process.env.PORT || 3000
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodPar = require('body-parser')
const metOve = require('method-override')
const mongoose = require('mongoose')
const Record = require('./models/record')
const Category = require('./models/category')


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('mongodb connected') })


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodPar.urlencoded({ extended: true }))
app.use(metOve('_method'))


app.get('/', (req, res) => {
  let yeah = 0

  Category.find()
    .lean()
    .then(cat => categories = cat)
  Record.find()
    .lean()
    .then(amount => { amount.forEach(amount => yeah += (amount.amount)) })
    .catch(error = console.log('error'))
  Record.find()
    .lean()
    .then(recodes => res.render('index', { recodes, categories, yeah }))
    .catch(error = console.log('error'))
})

app.get('/:filter', (req, res) => {
  const filter = req.params.filter
  let yeah = 0

  Category.find()
    .lean()
    .then(cat => categories = cat)
  Record.find({ category: filter })
    .lean()
    .then(amount => { amount.forEach(amount => yeah += (amount.amount)) })
    .catch(error = console.log('error'))
  Record.find({ category: filter })
    .lean()
    .then(recodes => res.render('index', { recodes, categories, filter, yeah }))
    .catch(error = console.log('error'))
})

app.get('/record/new', (req, res) => {
  Category.find()
    .lean()
    .then(cat => categories = cat)
  res.render('new', { categories })
})

app.post('/record', (req, res) => {
  const { name, category, date, amount } = req.body
  let icon = req.body.category

  if (icon === "家居物業") {
    icon = '<i class=\"fas fa-home\"></i>'
  } else if (icon === "交通出行") {
    icon = '<i class="fas fa-shuttle-van"></i>'
  } else if (icon === "休閒娛樂") {
    icon = '<i class="fas fa-grin-beam"></i>'
  } else if (icon === "餐飲食品") {
    icon = '<i class="fas fa-utensils"></i>'
  } else if (icon === "其他") {
    icon = '<i class="fas fa-pen"></i>'
  }

  return Record.create({ name, category, date, amount, icon })
    .then(() => res.redirect('/'))
    .catch(error = console.log('error'))
})

app.get('/record/:id/edit', (req, res) => {
  const id = req.params.id

  Category.find()
    .lean()
    .then(cat => categories = cat)

  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record, categories }))
    .catch(error = console.log('error'))
})

app.put('/record/:id/', (req, res) => {
  const { name, category, date, amount } = req.body
  const id = req.params.id
  let icon = req.body.category

  if (icon === "家居物業") {
    icon = '<i class=\"fas fa-home\"></i>'
  } else if (icon === "交通出行") {
    icon = '<i class="fas fa-shuttle-van"></i>'
  } else if (icon === "休閒娛樂") {
    icon = '<i class="fas fa-grin-beam"></i>'
  } else if (icon === "餐飲食品") {
    icon = '<i class="fas fa-utensils"></i>'
  } else if (icon === "其他") {
    icon = '<i class="fas fa-pen"></i>'
  }

  return Record.findById(id)
    .then(record => {
      record.category = category
      record.name = name
      record.date = date
      record.amount = amount
      record.icon = icon
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

app.delete('/record/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log('error'))
})


app.listen(port, () => {
  console.log(`This app is running on http://localhost${port}`)
})





