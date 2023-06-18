import nodemailer from "nodemailer"
export  async function sendEmail(to, subject, html) {


  let transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASS, 
    },
  });

  let info = await transporter.sendMail({
    from: `"Knowledge Academy" <${process.env.EMAIL}>`, // sender address
    to , // list of receivers
    subject , // Subject line
    html , // html body
  });
}
