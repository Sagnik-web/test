const express = require('express')
const userRouter = require('./Router/user.router')
const postRouter = require('./Router/post.router')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client/dist')));


app.use('/api/v1/auth',userRouter)
app.use('/api/v1/post',postRouter)



module.exports = app
