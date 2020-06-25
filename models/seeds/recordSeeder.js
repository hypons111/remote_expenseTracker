const mongoose = require('mongoose')
const Record = require('../record')
const spended = require('../../spended')



mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => {
  for (let i = 0; i < spended.results.length; i++) {
    Record.create({
      name: spended.results[i].name,
      category: spended.results[i].category,
      date: spended.results[i].date,
      amount: spended.results[i].amount
    })
    // Record.date instanceof Date // 唔 work
  }
  // Record.date instanceof Date // 唔 work
  console.log('Recode uploaded')
})




