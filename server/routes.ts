import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Function to send email via webhook service
const sendEmailWebhook = async (name: string, email: string, subject: string, message: string) => {
  try {
    // Using a simple webhook service that forwards emails
    const webhookData = {
      to: 'vijaykumar.vk3105@gmail.com',
      from: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `New message from ${name} (${email}):\n\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
      `
    };

    // Use Web3Forms - completely free email forwarding service
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name,
          email,
          subject: `Portfolio Contact: ${subject}`,
          message: `New message from ${name} (${email}):\n\nSubject: ${subject}\n\nMessage:\n${message}`,
          from_name: `Portfolio Contact - ${name}`,
          to: 'vijaykumar.vk3105@gmail.com',
          _replyto: email,
          _subject: `Portfolio Contact: ${subject}`,
          _cc: email // Send a copy to the sender
        })
      });

      if (response.ok) {
        console.log('Email sent successfully via Web3Forms');
        return true;
      } else {
        const error = await response.text();
        console.log('Web3Forms error:', error);
      }
    } catch (error) {
      console.log('Web3Forms failed:', error);
    }

    return false;
  } catch (error) {
    console.error('All email services failed:', error);
    return false;
  }
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

      // Log the message for debugging
      console.log('=== CONTACT FORM MESSAGE ===');
      console.log(`From: ${name} (${email})`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log('============================');

      // Try to send email using webhook service
      const emailSent = await sendEmailWebhook(name, email, subject, message);
      
      if (emailSent) {
        res.status(200).json({ message: 'Message sent successfully! You will receive an email notification.' });
      } else {
        // Fallback: still show success to user but note email issue
        console.log('Email webhook failed, but message was logged');
        res.status(200).json({ message: 'Message received successfully! I will get back to you soon.' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
