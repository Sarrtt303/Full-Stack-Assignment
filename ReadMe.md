Connection URL: mongodb+srv://sagardebnath1001:FT9OBTvqVo034IzJ@user-auth.vqtjenf.mongodb.net/?retryWrites=true&w=majority&appName=user-auth

CLOUDINARY_URL=cloudinary://778534821324272:01tcu07hmlmzs-rct0v_esIT_qg@dey8jatax

resend_api_key=re_CWdFpLnz_6ajSsjwATmHuGizS2JnuS59Y


Using resend:


const express = require('express');
const { Resend } = require('resend');

const app = express();
const resend = new Resend('your_resend_api_key_here');

app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Your Name <yourname@yourdomain.com>',
      to,
      subject,
      html,
    });

    if (error) {
      throw new Error(error);
    }

    res.status(200).json({ message: 'Email sent successfully', data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));