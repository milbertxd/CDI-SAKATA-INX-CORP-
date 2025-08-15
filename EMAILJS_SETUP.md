# 📧 EmailJS Setup Guide for Automatic Email Sending

## 🎯 What This Does
- **Automatically sends emails** directly from your website to your inbox
- **No backend server needed** - works from frontend only
- **Free service** with good limits for contact forms
- **Professional email delivery** with proper formatting

## 📋 Step-by-Step Setup

### 1. Create EmailJS Account
1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** and create a free account
3. Verify your email address

### 2. Add Email Service
1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** (recommended) or your email provider
4. Connect your email account (alano.mico.s.119@cdm.edu.ph)
5. Copy the **Service ID** (e.g., "service_abc123")

### 3. Create Email Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template content:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}} ({{from_email}})
Company: {{company}}
Phone: {{phone}}
Inquiry Type: {{inquiry_type}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent via CDI SAKATA INX CORP website contact form.
Reply to: {{from_email}}
```

4. Copy the **Template ID** (e.g., "template_xyz789")

### 4. Get Public Key
1. Go to **"Account"** → **"General"**
2. Copy your **Public Key** (e.g., "abcdefghijklmnop")

### 5. Update Your Code
In `Contact.tsx`, replace the placeholder values:

```typescript
const serviceID = 'service_abc123'; // Your Service ID
const templateID = 'template_xyz789'; // Your Template ID  
const publicKey = 'abcdefghijklmnop'; // Your Public Key
```

## 🔧 Code Location to Update

File: `src/pages/Contact.tsx`
Lines: ~45-47

Replace these lines:
```typescript
const serviceID = 'service_xxxxxxx'; // Replace with your Service ID
const templateID = 'template_xxxxxxx'; // Replace with your Template ID
const publicKey = 'xxxxxxxxxxxxxxx'; // Replace with your Public Key
```

## ✅ Testing
1. Fill out your contact form
2. Click "Send Message"
3. Should see "Sending..." then "Message Sent ✓"
4. Check your email inbox for the message

## 🆓 Free Limits
- **200 emails/month** on free plan
- **Upgrade available** for higher limits
- Perfect for contact forms

## 🔒 Security Note
- Public key is safe to expose in frontend code
- EmailJS handles all security for email sending
- Your email credentials stay secure with EmailJS

## 🛠️ Troubleshooting
If emails don't send:
- Check EmailJS dashboard for delivery logs
- Verify service is connected properly
- Ensure template variables match code
- Form will fallback to mailto method if EmailJS fails

## 📞 Alternative Contact Methods
Even with EmailJS, your form includes backup methods:
- Direct email links
- Phone numbers
- Physical addresses
- Mailto fallback if EmailJS fails

---
**Need Help?** Check EmailJS documentation: https://www.emailjs.com/docs/
