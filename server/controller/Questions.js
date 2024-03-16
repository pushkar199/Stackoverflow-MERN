const Question = require('../model/question')
const mongoose = require('mongoose')

exports.AskQuestion = async(req,res)=>{
    const postData = req.body;
    const userId = req.userId;
    const postQuestion = new Question ({ ...postData, userId});
    try {
        await postQuestion.save()
        res.status(200).json("Posted Question Successfully")
    } catch (error) {
        console.log(error);
        res.send(500).json("could not post a new question")
    }

}


exports.getAllQuestions = async(req,res)=>{
    try {
        const questionList = await Question.find().sort({askedOn: -1});
        res.status(200).json(questionList)
    } catch (error) {
        console.log(error)
    }
}


exports.deleteQuestions = async(req,res)=>{
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No such question found');
    }

    try {
       await Questions.findByIdAndRemove(_id); 
       res.status(200).json({message:"Deleted the question"})
    } catch (error) {
        console.log(error)
    }
}


exports.voteQuestions = async(req,res)=>{
    const { id:_id }= req.params;
    const {value} = req.body;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid( _id)){
        return res.status(404).send("question unavailable...");
    }

    try {
        const question = await Question.findById(_id);
        const upIndex = question.upVote.findIndex((id)=> id=== String(userid));
        const downIndex = question.downVote.findIndex((id)=> id ===String(userId));

        if (value === "upVote"){
            if (downIndex !== -1){
                question.downVote=question.downVote.filter((id)=> id !== String(userId))
            }
            if (upIndex === -1) {
                question.upVote.push(userId);
            } else {
                question.upVote = question.upVote.filter((id) => id !== String(userId));
            }
        }else if (value === "downVote") {
            if (upIndex !== -1) {
              question.upVote = question.upVote.filter((id) => id !== String(userId));
            }
            if (downIndex === -1) {
              question.downVote.push(userId);
            } else {
              question.downVote = question.downVote.filter(
                (id) => id !== String(userId)
              );
            }
        }
        await Questions.findByIdAndUpdate(_id, question);
        res.status(200).json({ message: "voted successfully..." });
    } catch (error) {
        console.log(error)
    }
}

