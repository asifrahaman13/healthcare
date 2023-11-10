import { createTransport } from "nodemailer";
async function SendEmail(email, otp, subject = "Verify Your Email Address", text = "Your OTP for email verification is") {
  const transporter = createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: subject,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
          <h2>${subject}</h2>
          <p>${text} <strong>${otp}</strong></p>
          <p>
            Thank you for using our service. If you have any questions, please contact us.
          </p>
          <p>
            Best regards,<br>
            Your Company Name
          </p>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
export default SendEmail;
