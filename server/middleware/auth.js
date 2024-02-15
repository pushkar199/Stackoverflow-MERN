require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req,res,next) =>{
    try {
        const token = req.header('x-auth-token');  // get the token from header
        if (!token) {
            return res.status(401).json({msg: 'No Token Provided, access denied'});
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(401).json({msg: "Token verification failed, authorization denied"})
        }
        const { id, name } = verified
        req.user = { id, name }

        next()
    }catch(err){
        res.status(500).json({
            error: err.message
        });
    }

}


module.exports = auth;