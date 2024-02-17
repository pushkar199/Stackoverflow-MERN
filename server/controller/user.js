const mongoose = require('mongoose');
const User = require("../model/user");

exports.getAllUser = async (req, res) =>{
    try {
       const users = await User.find();
       const userDetail = [];
       users.forEach((user)=>{
        userDetail.push({
            id: users._id,
            name: users.name,
            about: users.about,
            tags: users.tags,
            joinedOn: users.joinedOn
        })
       }) 
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


exports.updateProfile = async(req,res)=>{
    const {id: _id} = req.param;
    const {name,about,tags}= req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("Invalid User ID")

    try {
        const updatedProfile = await users.findByIdAndUpdate(
            _id,
            {$set:{name:name, about: about, tags: tags}},
            {new:true}
        )
        res.status(200).json(updatedProfile)
        
    } catch (error) {
        res.status(405).json({
            message : error.message
        })
    }
}