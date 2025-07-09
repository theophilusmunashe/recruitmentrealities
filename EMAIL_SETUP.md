# Email Setup for Recruitment Realities

This document explains how to set up email notifications for form submissions in the Recruitment Realities project.

## Local Development

1. Configure your `.env.local` file with the following variables:

```
# SMTP Configuration
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
SMTP_FROM=Recruitment Realities <your-email@yourdomain.com>
NOTIFICATION_EMAIL=your-notification-email@example.com
```

2. Replace the values with your actual email provider details.

3. Test the email functionality by:
   - Submitting the waitlist form on the homepage
   - Visiting `/test-email` to send a test email directly

## Vercel Deployment

When deploying to Vercel, add these environment variables in the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add each of the variables from your `.env.local` file:
   - SMTP_HOST
   - SMTP_PORT
   - SMTP_SECURE
   - SMTP_USER
   - SMTP_PASS
   - SMTP_FROM
   - NOTIFICATION_EMAIL

## Email Provider Options

### cPanel Email

```
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
SMTP_FROM=Recruitment Realities <your-email@yourdomain.com>
NOTIFICATION_EMAIL=your-notification-email@example.com
```

### Gmail

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=Recruitment Realities <your-gmail@gmail.com>
NOTIFICATION_EMAIL=your-notification-email@example.com
```

**Important Note for Gmail**: If you have 2-Factor Authentication enabled (recommended), you'll need to create an "App Password" specifically for this application. You cannot use your regular Gmail password.

### Office 365

```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
SMTP_FROM=Recruitment Realities <your-email@yourdomain.com>
NOTIFICATION_EMAIL=your-notification-email@example.com
```

## Troubleshooting

If emails are not being sent:

1. Check the server logs for detailed error messages
2. Verify your SMTP credentials are correct
3. Make sure your email provider allows sending from your application
4. Some email providers may require additional security settings
5. Try using a different email provider for testing