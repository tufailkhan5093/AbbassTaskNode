require('dotenv').config();
const {verify} = require('jsonwebtoken');
//importing redis
const redis_Client = require('../routes/redis_connect')
module.exports = async function validateAdmin(req,res, next){
    try {
        const acccessToken = req.header('accessToken');
        //If no token -- Throw Error
        if(!acccessToken) throw new Error();
        // Verify Token , If not auto Throw Error
        const validToken = verify(acccessToken, process.env.JWT_ACCESS_SECRET);
        const redis_Token = await redis_Client.get(validToken.id);
        if(!redis_Token) throw new Error();
        const redis_valid = verify(redis_Token, process.env.JWT_ACCESS_SECRET);
        req.user = redis_valid;
        next();
    } catch (error) {
        return res.json({
            status: '0',
            message: 'Access Denied',
            data: [],
            error: 'You are not authorized to access it',
        })  
    }
}

//redis_Client.del(key);