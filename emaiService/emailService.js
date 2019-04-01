const env = require('../env/env');
const nodemailer = require('nodemailer');

class EmailService {
    constructor() {}

    // * method for sending email
    static sendVerifyEmail(receiver, verifyUrl) {
        console.log('starting sending email...');
        console.log('the receiver email is ' + receiver);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'batmandocode@gmail.com',
                pass: '911004wsrA'
            },
        });

        nodemailer.createTestAccount(() => {
            const mailOptions = {
                from: 'batmandocode@gmail.com', // sender address
                to: `${receiver}`, // list of receivers
                subject: 'verification email', // Subject line
                text: 'Hello world?', // plain text body
                html: `${verifyUrl}` // html body
            }
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log(err)
                else
                    console.log(info);
            });
        })
    }
}


module.exports = EmailService;