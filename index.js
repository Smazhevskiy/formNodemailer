const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()
const cors = require('cors')
const route = express.Router()
require('dotenv').config()
const port = process.env.PORT || 3010
// Parse incoming requests data (https://github.com/expressjs/body-parser)


app.use('/v1', route)
app.use(cors({origin: 'https://github.com/Smazhevskiy'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))







app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
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


app.get('/', (req, res) => {
    res.send('hello world работает')
})


app.post('/sendMessage', async (req, res) => {
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