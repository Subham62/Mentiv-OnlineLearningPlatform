import nodemailer from "nodemailer";

const sendEmail = async ({ emailTo, subject, code, content }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const message = {
    from: process.env.SENDER_EMAIL,
    to: emailTo,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">Password Reset Code</h2>
        <p>Use the code below to ${content}:</p>
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h1 style="color: #4CAF50; margin: 0; letter-spacing: 5px;">${code}</h1>
        </div>
        <p style="color: #666;">This code will expire in 15 minutes.</p>
        <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(message);
};

export default sendEmail;
