const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const port = process.env.PORT || 3010
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors()) //{origin: 'https://github.com/Smazhevskiy'}
app.options('*', cors());


app.get('/', cors(), (req, res) => {
    res.send('hello world работает')
})


const transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
})


app.post('/sendMessage', cors(),  async (req, res) => {
    const {name, contacts, message} = req.body

    const mailData = {
        from: name,
        to: 'a.zmashevskiy@gmail.com',
        subject: contacts,
        text: message,
        html: `<b>Сообщение c формы</b>
<div>name: ${name}</div>
<div>contacts: ${contacts}</div>
<div>message: ${message}</div>`,
    }

   await transporter.sendMail(mailData, (error, info) => {
        if(error) {
            res.status(400).send({error: error})
            return console.log(error)
        }
        res.status(200).send({message: 'Mail send'})
    })
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
