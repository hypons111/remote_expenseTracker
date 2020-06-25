const mongoose = require('mongoose')

//  建構一個 Schema 模型
const Schema = mongoose.Schema

//  把資料結構當成參數傳給 new Schema()
const categorySchema = new Schema({
  category: {
    type: String,
  }
})

//  把 schema 輸出
module.exports = mongoose.model('Category', categorySchema)



