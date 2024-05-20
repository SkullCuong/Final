const nodemailer = require('nodemailer');

const sendMail = {
  async sendMail(subject, link, email) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'phucuong230602@gmail.com',
        pass: 'qecuvnvbuplbhhzs',
      },
    });
    const mailOptions = {
      from: 'phucuong230602@gmail.com',
      to: email,
      subject: subject,
      html: link,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
      }
    });
  },
};
module.exports = sendMail;
