const express =require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const {AskQuestion,
       getAllQuestions,
       deleteQuestions,
       voteQuestions} = require('../controller/Questions.js')

router.post('/api/ask', auth , AskQuestion)
router.post('/api/get', auth , getAllQuestions)
router.post('/api/delete/:id', auth , deleteQuestions)
router.post('/api/vote', auth , voteQuestions) 

module.exports = router