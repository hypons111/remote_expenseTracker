const express = require('express')
const router = express.Router()
const metOve = require('method-override')
const home = require('./modules/home')
const crud = require('./modules/crud')

router.use(metOve('_method'))
router.use('/', home)
router.use('/record', crud)


module.exports = router