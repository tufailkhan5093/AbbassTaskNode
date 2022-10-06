require('dotenv').config();
var crypto = require("crypto");
//importing Models
const { user, List, Task, TaskComment, TaskNote ,TaskLog} = require('../models');
// Importing Custom exception
const CustomException = require('../middlewares/errorObject');
//importing redis
const redis_Client = require('../routes/redis_connect');
const { sign } = require('jsonwebtoken');
const getDistance = require('../Helper/getDistance')

const notification = require('../Helper/notification')
const multiple_notifications = require('../Helper/multiple_notifications')
// OTP generator
var otp = require("otpauth");
let totp = new otp.TOTP({
    issuer: 'ACME',
    label: 'AzureDiamond',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: 'NB2W45DFOIZA' // or "OTPAuth.Secret.fromBase32('NB2W45DFOIZA')"
});

const stripe = require('stripe')(process.env.STRIPE_KEY);
const bcrypt = require('bcrypt');
const { Op, json, and } = require("sequelize");
const axios = require('axios')
// Calling mailer
const nodemailer = require('nodemailer');
// Defining the account for sending email
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // use TLS
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const async = require('../middlewares/async');

// let fcm = new FCM(process.env.FIREBASE_SERVER_KEY);

//NOTIFICATION REQUIRMENTS
let FCM = require('fcm-node');
let serverKey = process.env.FIREBASE_SERVER_KEY1;
let fcm = new FCM(serverKey);

async function AddNewUser(req, res) {

    const salt = await bcrypt.genSalt(10);
    const { phone_no, username, password } = req.body;

    // check if user with same Phone exists 
    const phoneCheck = await user.findOne({ where: { phone_no: phone_no } });
    if (phoneCheck) {
        return res.json({
            status: '0',
            message: 'Phone num already taken',
            data: [],
            error: 'Phone num already taken',
        });
    }
    else {
        const newuser = new user;
        newuser.phone_no = phone_no;
        newuser.username = username;
        const accessToken = sign({ phone_no: phone_no, username: username }, 'Important Text');
        newuser.universal_unique_token = accessToken;
        newuser.password = await bcrypt.hash(password, salt);
        await newuser.save().then(userdata => {

            return res.status(200).json({
                'message': 'User Registerd',
                'status': "1",
                'data': newuser,
                'error': ''
            });

        })
    }
};

async function AddNewList(req, res) {
    const { listName, ListSyncStatus, phone_no, username, isShared } = req.body;
   
    const newlist = new List();
    newlist.listName = listName;
    newlist.phone_no = phone_no;
    newlist.username = username;
    newlist.ListSyncStatus = ListSyncStatus;
    newlist.isShared = isShared;

    let task_list = [];
    let comment_list = [];
    let note_list = [];
    let log_list = [];

    newlist.save().then(async list => {
        
        for (var i = 0; i < req.body.tasks.length; i++) {

           
            const newtask = new Task();
            newtask.taskName = req.body.tasks[i].taskName;
            newtask.taskState = req.body.tasks[i].taskState;
            newtask.taskName = req.body.tasks[i].taskName;
            newtask.taskSyncStatus = 1;
            newtask.ListId = newlist.id;
            const newTask = await newtask.save();

            task_list.push(newtask);
            

            for (var k = 0; k < req.body.tasks[i].comments.length; k++) {
                const newComment = new TaskComment();
                newComment.comment_user_phone = req.body.tasks[i].comments[k].comment_user_phone;
                newComment.comment_username = req.body.tasks[i].comments[k].comment_username;
                newComment.commentText = req.body.tasks[i].comments[k].commentText;
                newComment.TaskId = newTask.id;
                
                const newcomm = await newComment.save();
                comment_list.push(newComment);

            }

            for (var j = 0; j < req.body.tasks[i].tasknotes.length; j++) {
                const newnote = new TaskNote();
                newnote.note_user_phone = req.body.tasks[i].tasknotes[j].note_user_phone;
                newnote.note_username = req.body.tasks[i].tasknotes[j].note_username;
                newnote.noteText = req.body.tasks[i].tasknotes[j].noteText;
                newnote.TaskId = newTask.id;
                const newNote = await newnote.save();
                note_list.push(newnote);
               

            }

            for (var m = 0; m < req.body.tasks[i].tasklogs.length; m++) {

                const newLog = new TaskLog();
                newLog.change_task_log_name = req.body.tasks[i].tasklogs[m].change_task_log_name;
                newLog.change_task_log_state = req.body.tasks[i].tasklogs[m].change_task_log_state;
                newLog.change_by = req.body.tasks[i].tasklogs[m].change_by;
                newLog.TaskId = newTask.id;
                const newlog = await newLog.save();

                log_list.push(newLog);

                


            }



        }

    return res.status(200).json({
        "List": newlist,
        "tasks":task_list,
        "comments":comment_list,
        "log":log_list
    });
        
    })

}

module.exports = {
    AddNewUser,
    AddNewList

}
