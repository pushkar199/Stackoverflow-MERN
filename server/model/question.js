const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({

    questionBody: { type: String, required: "Question should have a body" },
    title: {type : String, required: "Question should have a title"},
    tag: {type:String, required: "Question should have a tag"},
    noOfAnswer: {type:Number , default:0}, 
    upvote : {type: [Number], default:[]}, 
    downvote : {type: [Number], default:[]},
    userPosted: {type: String , required: "Question must have an author"},
    userId: {type: "String"},
    askedOn: {type: "Date", default: Date.now()},
    answer: [

        {
            answerBody: String,
            userAnswered: String,
            userId: String,
            answeredOn: { type: Date, default: Date.now },
        },

    ],



})

export default mongoose.model("Question", QuestionSchema);
