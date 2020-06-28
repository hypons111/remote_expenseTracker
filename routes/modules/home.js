const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  let totalAmount = 0

  Promise.resolve(
    Category.find()
      .lean()
      .then(cat => categories = cat)
  )
    .then(() => {
      return Promise.resolve(
        Record.find()
          .lean()
          .then(amount => { amount.forEach(amount => totalAmount += (amount.amount)) })
      )
    })
    .then(() =>
      Record.find()
        .lean()
        .then(recodes => res.render('index', { recodes, categories, totalAmount }))
    )
    .catch(error => console.error(error))
})


router.get('/:filter', (req, res) => {
  const filter = req.params.filter
  let totalAmount = 0

  Promise.resolve(
    Category.find()
      .lean()
      .then(cat => categories = cat)
  )
    .then(() => {
      return Promise.resolve(
        Record.find({ category: filter })
          .lean()
          .then(amount => { amount.forEach(amount => totalAmount += (amount.amount)) })
      )
    })
    .then(() =>
      Record.find({ category: filter })
        .lean()
        .then(recodes => res.render('index', { recodes, categories, filter, totalAmount }))
    )
    .catch(error => console.log(error))
})


module.exports = router