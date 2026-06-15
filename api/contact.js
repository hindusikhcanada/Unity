const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  try {
    await resend.emails.send({
      from: 'HSUF Website <noreply@hindusikhunity.com>',
      to: ['info@hindusikhunity.com'],
      replyTo: email,
      subject: `[HSUF Contact] ${subject || 'New Message'} — from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#D4560A,#1A3A6B);padding:28px;text-align:center;">
            <h2 style="color:#fff;margin:0;font-size:22px;">Hindu Sikh Unity Forum Canada</h2>
            <p style="color:#FFD98A;margin:6px 0 0;font-size:13px;">New Contact Form Submission</p>
          </div>
          <div style="padding:28px;background:#fff;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#888;width:100px;font-size:13px;">Name</td>
                  <td style="padding:8px 0;font-weight:bold;color:#1A3A6B;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#888;font-size:13px;">Email</td>
                  <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#D4560A;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:8px 0;color:#888;font-size:13px;">Phone</td>
                  <td style="padding:8px 0;color:#333;">${phone}</td></tr>` : ''}
              <tr><td style="padding:8px 0;color:#888;font-size:13px;">Subject</td>
                  <td style="padding:8px 0;color:#333;">${subject || 'General Inquiry'}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
            <p style="color:#888;font-size:13px;margin:0 0 8px;">Message</p>
            <div style="background:#FAF3E0;border-left:4px solid #D4560A;padding:16px;border-radius:4px;color:#333;line-height:1.7;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
          <div style="background:#f8f8f8;padding:16px;text-align:center;border-top:1px solid #eee;">
            <p style="color:#aaa;font-size:11px;margin:0;">Sent from hindusikhunity.com contact form</p>
          </div>
        </div>
      `
    });

    // Auto-reply to sender
    await resend.emails.send({
      from: 'Hindu Sikh Unity Forum Canada <noreply@hindusikhunity.com>',
      to: [email],
      subject: 'Thank you for contacting HSUF Canada',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#D4560A,#1A3A6B);padding:28px;text-align:center;">
            <h2 style="color:#fff;margin:0;font-size:22px;">Hindu Sikh Unity Forum Canada</h2>
            <p style="color:#FFD98A;margin:6px 0 0;font-size:13px;">Stronger Together</p>
          </div>
          <div style="padding:28px;background:#fff;">
            <p style="color:#333;font-size:15px;">Dear <strong>${name}</strong>,</p>
            <p style="color:#555;line-height:1.7;">Thank you for reaching out to the Hindu Sikh Unity Forum Canada. We have received your message and a member of our team will get back to you shortly.</p>
            <p style="color:#555;line-height:1.7;">In the meantime, feel free to explore our website at <a href="https://www.hindusikhunity.com" style="color:#D4560A;">www.hindusikhunity.com</a> or join our community for just $1.</p>
            <p style="color:#555;line-height:1.7;">Warm regards,<br/><strong style="color:#1A3A6B;">Hindu Sikh Unity Forum Canada</strong></p>
          </div>
          <div style="background:#f8f8f8;padding:16px;text-align:center;border-top:1px solid #eee;">
            <p style="color:#aaa;font-size:11px;margin:0;">www.hindusikhunity.com</p>
          </div>
        </div>
      `
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
};
