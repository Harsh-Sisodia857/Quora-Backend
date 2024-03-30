const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    question: { type: String, required: true },
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: "commentsModel",
        required: true,
    }],
});


const questionModel = mongoose.model("questionsModel", questionSchema);
module.exports = questionModel;