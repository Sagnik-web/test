const express = require('express')
const { register, login, userDetails } = require('../Controller/user.controller')
const { protectAuth } = require('../middleware/protect')

const userRouter = express.Router()


userRouter.post('/signup',register)
userRouter.post('/login',login)
userRouter.get('/details',protectAuth,userDetails)




module.exports = userRouter
