const category = [
  "家居物業",
  "交通出行",
  "休閒娛樂",
  "餐飲食品",
  "其他"
]


const mongoose = require('mongoose')
const Category = require('../category')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => {
  for (let i = 0; i < category.length; i++) {
    Category.create({ category: category[i] })
  }
  console.log('Category uploaded')
})
