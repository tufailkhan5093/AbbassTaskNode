module.exports = function(title,body,deviceToken) {
    
    let FCM = require('fcm-node');
    let serverKey = process.env.FIREBASE_SERVER_KEY1;
    let fcm = new FCM(serverKey);
    
     let message = {
        registration_ids: deviceToken,
        notification: {
        title: title, 
        body: body 
        },
    };
    
    fcm.send(message, function(error, result){

    if(error)
        {
            console.log(error);
        }
        console.log(result)
        });
}
