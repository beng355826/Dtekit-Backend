let router = require('express').Router()
const createUserController = require('../UserControllers/createUser.controller')
const getAllUsersController = require('../UserControllers/getAllUsers.controller')
const getUserByIdController = require('../UserControllers/getUserById.controller')
const updateUserByIdController = require('../UserControllers/updateUserById.controller')
const deleteUserByIdController = require('../UserControllers/deleteUserById.controller')


router.post('/users', createUserController)
router.get('/users', getAllUsersController)
router.get('/users/:id', getUserByIdController)
router.patch('/users/:id',updateUserByIdController)
router.delete('/users/:id', deleteUserByIdController)

module.exports = router