require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const upload = multer();
app.use(express.json());
app.use(cors());
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.PASSWORD // Your email password or app password
    }
});

app.get('/',(req,res)=>{
    res.render('click')
})

app.get('/form',(req,res)=>{
    res.render('form')
})

app.post('/form',upload.none(),(req,res)=>{
    const { name, email, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: "vamshibathula1163@gmail.com", // Change to your recipient email
        subject: `New Contact Form Submissionnn from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error sending email");
        }
        res.send("Email sent successfully!");
    });
})

app.listen(port=3000,()=>{
    console.log('listening')
})