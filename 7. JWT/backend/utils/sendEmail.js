require('dotenv').config();
const path = require('node:path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const { google } = require('googleapis');


const oAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN
});


const sendEmail = async (
  subject, 
  send_to, 
  send_from, 
  reply_to, 
  template, 
  name, 
  link
) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'aayushmaan.soni54@gmail.com',
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    });

    const handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./views'),
        defaultLayout: false
      },
      viewPath: path.resolve('./views'),
      extName: '.handlebars',
    };

    transport.use('compile', hbs(handlebarOptions));

    const mailOptions = {
      from: send_from,
      to: send_to,
      replyTo: reply_to,
      subject: subject,
      template: template,
      context: {
        name: name,
        link: link,
        email: send_to
      }
    };

    const info = await transport.sendMail(mailOptions);
    console.log('Email sent: ', info);
  } catch (err) {
    console.error('Error sending email: ', err);
  }
};


module.exports = sendEmail;