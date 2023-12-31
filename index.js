const express = require("express");
const app = express();
require("dotenv").config();
const { port, mailer } = require("./config/config");
const morgan = require("morgan");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
const bodyParser = require("body-parser");
const fileUpload = require ('express-fileupload')
const path = require('path')
const axios = require('axios');
const FormData = require('form-data');
const { sendMail } = require("./src/v1/helper/nodemailer");
require('./config/database');

app.use(helmet());


app.use(cors({
    origin: '*'
  }));
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "50mb" }));
app.set('view engine', 'ejs')
app.use(cookieParser());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

//options for cors middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})


app.use(express.static(path.join(__dirname, './src/v1/views')));
 app.use(express.static(path.join(__dirname, './src/v1/public/images')));


app.get('/', (req, res) => {
    res.send(`<div align="center" style=""><h1> WELCOME IN Sample API. <h1><div>`)
})
app.get('/v1/teacher/:user/:fileName', (req, res) => {
    const file = path.join(__dirname, `./src/v1/public/image/teacher/${req.params.user}/${req.params.fileName}`)
    console.log(file)
    res.sendFile(file);
})
// this for routes(endpoint of api)
require('./src/v1/routes/routes')(app);
// this is for cron job
// require('./src/v1/helper/cron')



// ...



app.post('/parse-pdf', async (req, res) => {
  try {
    const form = new FormData();
    form.append('file', req.files.file.data, req.files.file.name);
    // any other form data fields that the API endpoint requires

    const response = await axios.post('https://ai-projects.azurewebsites.net/parse_pdf', form, {
      headers: form.getHeaders(),
    });
    console.log(">>>>>",form.getHeaders())
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



 
app.listen(port, async() => {
//  await sendMail("react.nodejs16@gmail.com",null,"API Testing","something happened")


    console.log("Server is running on PORT:", port);
})