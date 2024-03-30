const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    question: {
        type: mongoose.Schema.ObjectId,
        ref: "questionsModel",
        required: true,
    },
    comment: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
});

const commentModel = mongoose.model("commentsModel", commentSchema);

module.exports = commentModel;