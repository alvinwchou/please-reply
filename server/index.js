const express = require('express')
const app = express()
require('dotenv').config()

const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer")


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors())

app.post("/send_mail", cors(), (req,res) => {
        console.log(req.body);
        let {text} = req.body
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
    
        transport.sendMail({
            from: process.env.MAIL_FROM,
            to: 'test@test.com',
            subject: 'Test Email',
            html: `<div className="email" style="
            border: 1px solid black;
            padding: 20px;
            font-family: sans-serif;
            line-height: 2;
            font-size: 20px; 
            ">
            <h2>Here is your email!</h2>
            <p>${text}</p>
        
            <p>All the best</p>
            </div>`
        }, (err) => {
            if(err){
                console.log('error', err);
            } else {
                console.log('success');
            }
        })
        res.send('Successfully sent')
    })

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server is starting at port ${PORT}`);
})