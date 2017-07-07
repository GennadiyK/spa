const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: '7742589@gmail.com',
    pass: 'Gennadiy05'
  },
  tls: {
    rejectUnauthorized: false
  }
})

module.exports = {
  sendMail: (options) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        return console.log(err)
      } else {
        console.log(info)
      }
    })
  }
}
