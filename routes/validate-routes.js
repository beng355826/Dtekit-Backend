let router = require('express').Router()
const detectUserController = require('../validateControllers/detectUser.controller')
const authoriseUserController = require('../validateControllers/authoriseUser.controller')

router.patch('/validate/detectUser', detectUserController)
router.patch('/validate/authoriseUser', authoriseUserController )

module.exports = router