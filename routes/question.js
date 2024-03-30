const express = require('express');
const { authenticated } = require('../middleware/auth');
const router = express.Router();
const { createQuestion, answerQuestion, getAllQuestions, likeComment, dislikeComment} = require('../controller/questionController')

router.post("/ask",authenticated,createQuestion);
router.post("/answer/:id",authenticated,answerQuestion);
router.get("/all", getAllQuestions);
router.post("/like/:id", authenticated, likeComment);
router.post("/dislike/:id",authenticated, dislikeComment);

module.exports = router;