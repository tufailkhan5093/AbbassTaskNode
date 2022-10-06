

const {verify} = require('jsonwebtoken');
const {BlackList} = require('../models');

const validateToken =(req, res, next) =>{
    const accessToken = req.header('accessToken');
    if (!accessToken) return res.json({
        'ResponseCode': '0',
        'ResponseMessage': 'Please Login to continue',
        'Response': {},
        'errors': 'User not logged In()',
    })
    BlackList.findOne({where: { accessToken: accessToken }})
        .then(dat=>{
            if(dat){
                return res.json({
                    'ResponseCode': '0',
                    'ResponseMessage': 'Please Login to continue',
                    'Response': {},
                    'errors': 'User not logged In',
            }); 
        }
        else{
            try{
        
        const validToken = verify(accessToken, 'Important Text');
        req.user = validToken;
        console.log(validToken)
        if(validToken) return next();
    }
    catch(err){
        return res.json({
            'ResponseCode': '0',
            'ResponseMessage': 'Invalid AccessToken',
            'Response': {},
            'errors': 'Access Denied',
        })
    }
        }
    })
    
};

module.exports= {validateToken};








// const validateToken = (req, res, next) => {
//     const accessToken = req.header('accessToken');
//     if (!accessToken) return res.json({
//         'ResponseCode': '0',
//         'ResponseMessage': 'Please Login to continue',
//         'Response': {},
//         'errors': 'User not logged In()',
//     })
    
       
//     try {

//         const validToken = verify(accessToken, 'Important Text');
//         req.user = validToken;
//         console.log(validToken)
//         if (validToken) return next();
//     }
//     catch (err) {
//         return res.json({
//             'ResponseCode': '0',
//             'ResponseMessage': 'Invalid AccessToken',
//             'Response': {},
//             'errors': 'Access Denied',
//         })
//     }
// };

// module.exports = { validateToken };




// require('dotenv').config();
// const {verify} = require('jsonwebtoken');
// //importing redis
// const redis_Client = require('../routes/redis_connect')
// module.exports = async function validateToken(req,res, next){
//     try {
//         const acccessToken = req.header('accessToken');
//         //If no token -- Throw Error
//         if(!acccessToken) throw new Error();
//         // Verify Token , If not auto Throw Error
//         const validToken = verify(acccessToken, process.env.JWT_ACCESS_SECRET);
//         const redis_Token = await redis_Client.hGetAll(validToken.id);
//         if(!redis_Token) throw new Error();
//         let dvToken = validToken.deviceToken;
//         const redis_valid = verify(redis_Token[dvToken], process.env.JWT_ACCESS_SECRET);
//         req.user = redis_valid;
//         next();
//     } catch (error) {
//         return res.json({
//             status: '0',
//             message: 'Access Denied',
//             data: {},
//             error: 'You are not authorized to access it',
//         })
//     }
// }

// //redis_Client.del(key);