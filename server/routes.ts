import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from 'nodemailer';

// Create Gmail transporter
const createGmailTransporter = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return null;
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Log the submission for debugging
      console.log('Contact form submission:', { name, email, subject, message });

      // Try to send email using Gmail SMTP
      const transporter = createGmailTransporter();
      
      if (!transporter) {
        console.log('Gmail credentials not configured, message logged only');
        return res.status(200).json({ message: 'Message received successfully!' });
      }

      // Debug: Check if credentials are properly set (without logging sensitive data)
      console.log('Gmail auth configured:', {
        user: process.env.GMAIL_USER ? 'Set' : 'Not set',
        password: process.env.GMAIL_APP_PASSWORD ? 'Set (length: ' + process.env.GMAIL_APP_PASSWORD.length + ')' : 'Not set'
      });

      // Send email using Gmail SMTP
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: 'vijaykumar.vk3105@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        text: `
New contact form submission from your portfolio:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Reply to: ${email}
        `,
        html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
<p><strong>Subject:</strong> ${subject}</p>
<br>
<p><strong>Message:</strong></p>
<div style="background: #f5f5f5; padding: 15px; border-left: 3px solid #007bff; margin: 10px 0;">
${message.replace(/\n/g, '<br>')}
</div>
<br>
<p><em>You can reply directly to this email to respond to ${name}.</em></p>
        `,
        replyTo: email
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to vijaykumar.vk3105@gmail.com');

      res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
