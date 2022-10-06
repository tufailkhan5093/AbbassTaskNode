require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const error = require('./middlewares/error');
// Importing routes
const apisRouter = require('./routes/apis');

// Middleware which tells the server the format to send data
app.use(express.json());
app.use(cors());

// routes
app.use('/apis', apisRouter);

// Throwing unattended error
app.use(error);

// To make the folder Public
app. use('/Public', express.static('./Public'));

// Initializing Server along with creating all the tables that exist in the models folder
db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT, ()=> {console.log(`Starting the server at port ${process.env.PORT} ...`)});
});