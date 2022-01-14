const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const {HtmlMail} = require('./htmlMail')
const port = process.env.PORT || 3010
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors()) //{origin: 'https://github.com/Smazhevskiy'}
app.options('*', cors())


app.get('/', cors(), (req, res) => {
    res.send('server is running')
})


const mailData = (name, contacts, message) => {
    return (
        {
            from: 'Письмо с формы обратной связи',
            subject: 'HR WANTS ME',
            to: process.env.MAIL_TO || 'a.zmashevskiy@gmail.com',
            html: HtmlMail,
        }
    )
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: process.env.GMAIL_LOGIN,
        pass: process.env.GMAIL_PASS,
    },
})


app.post('/sendMessage', cors(), async (req, res) => {
    const {name, contacts, message} = req.body
    await transporter.sendMail(mailData(name, contacts, message), (error, info) => {
        if(error) {
            res.status(400).send({error: error, success: false})
            return console.log(error)
        }
        res.status(200).send({message: 'Mail send', success: true})
        res.send('Письмо успешно отправлено')
    })
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
