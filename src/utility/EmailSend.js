const nodemailer = require("nodemailer");

const SendEmailUtility = async (name, email, EmailText, EmailSubject) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true,

    auth: {
      user: "fjfahim1999@gamil.com",
      pass: "njdfgocpveoybvtl",
    },
  });

  let mailOptions = {
    from: "REST-API OTP CODE <fjfahim1999@gmail.com>",
    to: `${email}`,
    subject: EmailSubject,
    html: `<div>${EmailText}</div> <div> <p> Name: ${name}</p> <p> Email: ${email}</p></div> 
    <br/> <b>This Email Send From Sarkar</b>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { status: "success", message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email: ", error);
    return { status: "fail", message: "Error sending email" };
  }
};

module.exports = SendEmailUtility;
