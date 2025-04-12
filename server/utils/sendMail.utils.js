import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
      const transporter = nodemailer.createTransport({
        host : 'smtp.gmail.com',
        port : 465,
        secure : true,
        auth : {
          user : process.env.SMTP_EMAIL,
          pass : process.env.SMTP_PASS
        }
      });

      const mailOptions = {
        from : process.env.SMTP_EMAIL,
        to : options.to,
        subject : options.subject,
        html : options.message
      };

      await transporter.sendMail(mailOptions)
};

export default sendEmail