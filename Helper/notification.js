module.exports = function(title,body,deviceToken) {
    
    let FCM = require('fcm-node');
    let serverKey = process.env.FIREBASE_SERVER_KEY1;
    let fcm = new FCM(serverKey);
    
     let message = {
        to: deviceToken,
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



// const sendNotification =(req, res) =>{
// let FCM = require('fcm-node');
// let serverKey = process.env.FIREBASE_SERVER_KEY1;
// let fcm = new FCM(serverKey);

//  let message = {
//         to: "eHA5B_3STn2aRZRGrCXbAx:APA91bHf_rtJC4ItYxsl5bUP3vZg8jeyBHJJRgTIUJkMCIwVwvYhXV-C91Hem4gQBn8bwKonpnNx0om_g63DU9B61KZnOlIIUrWCfSJy42hTckiMvErLP2cJUb6-u7lVTgsVyt8xfTE_",
//         notification: {
//         title: "title", 
//         body: "body" 
//         },
//     };
   
//     fcm.send(message, function(error, result){

// if(error)
// {
//      console.log(error);
// }

   
//     console.log(result)
//     }); 
            
    
// };

// module.exports= {sendNotification};