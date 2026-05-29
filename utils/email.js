const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

const testMode = !process.env.EMAIL_USER;

async function sendFormEmail(formName, formData, pdfBuffer) {
  try {
    if (testMode) {
      console.log(`\n[TEST MODE] Would send email to: ${process.env.EMAIL_TO || 'info@coverpropainting.com'}`);
      console.log(`Form: ${formName}`);
      return { success: true, testMode: true };
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'info@coverpropainting.com',
      subject: `New Hire Form Submission: ${formName}`,
      html: `
        <h2>New Hire Form Submission</h2>
        <p><strong>Form:</strong> ${formName}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p>The completed form is attached as a PDF.</p>
        <p>---<br>Cover Pro Painting New Hire Forms</p>
      `,
      attachments: [
        {
          filename: `${formName}.pdf`,
          content: pdfBuffer
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✓ Email sent to ${process.env.EMAIL_TO}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { sendFormEmail };
