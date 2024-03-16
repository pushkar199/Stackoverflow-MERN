const mongoose = require ('mongoose')
const Questions = require('../model/question')

exports.postAnswer = async(req,res)=>{
    const{id:_id} = req.params
    const {noOfAnswers, answerBody, userAnswered} = req.body;
    const userId = req.userId
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("No such question exists")
    }
    updateNoOfQuestions(_id,noOfAnswers);
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id,{
            $addToSet: {answer : [{answerBody,userAnswered,userId}]},
        })
        res.status(200).json(updatedQuestion)
    } catch (error) {
        console.log(error)
    }
}

exports.updateNoOfQuestions = async(_id, noOfAnswers)=>{
    try {
       await Questions.findByIdAndUpdate(_id,{
        $set: {noOfAnswers:noOfAnswers},
       }) 
    } catch (error) {
        console.log(error)
    }
}


exports.deleteAnswer = async(req,res)=>{
    const{id:_id} = req.params
    const {answerId, noOfAnswers} = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("No such question exists")
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send("No such answer exists")
    }
    updateNoOfQuestions(_id, noOfAnswers);
    try {
        await Questions.updateOne(
            { _id },
            { $pull: { answer: { _id: answerId } } }
        );
        res.status(200).json({ message: "Successfully deleted..." });
    } catch (error) {
        console.log(error)
    }
}