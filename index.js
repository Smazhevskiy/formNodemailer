
const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')




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
            html: `<div
            style="
        box-sizing: border-box;
        width: 400px;
        font-size: 20px;
        background-color: #000;
      "
        >
            <div>
                <img
                    style="background-size: cover; width: 100%;"
                    src="https://f.vividscreen.info/soft/c79bb3903c454eb6111ca201e03694e9/Mountain-Lion-Nyan-Cat-320x240.jpg"
                    alt="nyanCat"
                />
            </div>
            <div
                style="
          color: cornsilk;
          padding-bottom: 8px;
          box-sizing: content-box;
          overflow: hidden;
          word-wrap: break-word;
        "
            >
                <div
                    style="
            padding: 5px;
            box-shadow: 0 4px 4px #b4b7a7, 0 1px 2px #d2cbcb;
          "
                >
                    name: ${name}
                </div>
                <div
                    style="
            padding: 5px;
            box-shadow: 0 4px 4px #b4b7a7, 0 1px 2px #d2cbcb;
          "
                >
                    contacts: ${contacts}
                </div>
                <div
                    style="
            padding: 5px;
            box-shadow: 0 4px 4px #b4b7a7, 0 1px 2px #d2cbcb;
          "
                >
                    message:${message}
                </div>
            </div>
        </div>`,
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
