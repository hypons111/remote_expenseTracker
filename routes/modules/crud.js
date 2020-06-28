const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(cat => categories = cat)
    .then(res.render('new', { categories }))
})


router.post('/', (req, res) => {
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
    .catch(error => console.log(error))
})


router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  Category.find()
    .lean()
    .then(cat => categories = cat)

  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record, categories }))
    .catch(error => console.log(error))
})


router.put('/:id/', (req, res) => {
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


router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router