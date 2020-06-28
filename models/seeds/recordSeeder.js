const Record = require('../record')
const spended = require('../../spended')
const db = require('../../config/mongoose')

db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => {
  for (let i = 0; i < spended.results.length; i++) {
    if (spended.results[i].category === "家居物業") {
      Record.create({
        name: spended.results[i].name,
        category: spended.results[i].category,
        date: spended.results[i].date,
        amount: spended.results[i].amount,
        icon: '<i class="fas fa-home"></i>'
      })
    } else if (spended.results[i].category === "交通出行") {
      Record.create({
        name: spended.results[i].name,
        category: spended.results[i].category,
        date: spended.results[i].date,
        amount: spended.results[i].amount,
        icon: '<i class="fas fa-shuttle-van"></i>'
      })
    } else if (spended.results[i].category === "休閒娛樂") {
      Record.create({
        name: spended.results[i].name,
        category: spended.results[i].category,
        date: spended.results[i].date,
        amount: spended.results[i].amount,
        icon: '<i class="fas fa-grin-beam"></i>'
      })
    } else if (spended.results[i].category === "餐飲食品") {
      Record.create({
        name: spended.results[i].name,
        category: spended.results[i].category,
        date: spended.results[i].date,
        amount: spended.results[i].amount,
        icon: '<i class="fas fa-utensils"></i>'
      })
    } else if (spended.results[i].category === "其他") {
      Record.create({
        name: spended.results[i].name,
        category: spended.results[i].category,
        date: spended.results[i].date,
        amount: spended.results[i].amount,
        icon: '<i class="fas fa-pen"></i>'
      })
    }
  }
  console.log('Recode uploaded')
})