const express = require('express')
const auth = require ('../middleware/auth')
const {postAnswer, deleteAnswer} = require('../controller/Answers')

const router = express.Router()

router.patch('/api/post/:id' , auth, postAnswer)
router.patch('/api/delete/:id' , auth, deleteAnswer)


module.exports = router