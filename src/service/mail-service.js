const nodemailer = require('nodemailer')

/*
const nodemailer = require('nodemailer');
        var smtpTransport = require('nodemailer-smtp-transport');

        //account from which we have to send email make sure use have allow permisions in account https://myaccount.google.com/lesssecureapps
        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
              user:  "YOUR_USER_NAME", //config.email 
              pass:  "PASSWORD"              //config.pass //password
            }
          }));
*/

const transporter = nodemailer.createTransport({ //{} - mailOpteion argument
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    }
})

/*
// verify connection configuration
transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});
*/
module.exports = {

    async sendActivationMail(to, link){
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation on ' + process.env.API_URL,
            text: '',
            html:
            `
                <div>
                    <h1>To activate, follow the link </h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    },
}