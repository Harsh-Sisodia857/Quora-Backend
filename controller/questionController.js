const Question = require('../models/question');
const Comment = require('../models/comments');

module.exports.createQuestion = async (req, res) => {
    try {
        const { question } = req.body;
        const newQuestion = await Question.create({
            user: req.user._id,
            question: question,
            comments: []
        });

        res.status(201).json({ success: true, Question: newQuestion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to create question' });
    }
};

module.exports.answerQuestion = async (req, res) => {
    const questionId = req.params.id;
    const { answer } = req.body;
    const newComment = await Comment.create({
        user: req.user._id,
        question: questionId,
        comment: answer,
        upvotes: 0,
        downvotes: 0 
    });

    const updatedQuestion = await Question.findByIdAndUpdate(
        questionId,
        { $push: { comments: newComment._id } },
        { new: true }
    );

    res.status(200).json({ success: true, data: updatedQuestion });

};

module.exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('user').populate('comments');
        res.status(200).json({ success: true, data: questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to fetch questions' });
    }
};

module.exports.likeComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { $inc: { upvotes: 1 } },
            { new: true } 
        );

        res.status(200).json({ success: true, data: updatedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to like comment' });
    }
};

module.exports.dislikeComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { $inc: { downvotes: 1 } },
            { new: true }
        );

        res.status(200).json({ success: true, data: updatedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to dislike comment' });
    }
};
