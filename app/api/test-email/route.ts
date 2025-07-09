import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(request: NextRequest) {
  // Only allow in development mode
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ 
      success: false, 
      error: 'This endpoint is only available in development mode' 
    }, { status: 403 });
  }

  try {
    // Create email transport configuration
    const config = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };
    
    // Log config (without password)
    console.log('Email config (without password):', {
      ...config,
      auth: { ...config.auth, pass: '****' }
    });
    
    // Create transporter
    const transporter = nodemailer.createTransport(config);
    
    // Verify connection configuration
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.NOTIFICATION_EMAIL || 'recruitment@wenext.africa',
      subject: '🧪 Test Email - Recruitment Realities',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #ff6b35; text-align: center; margin-bottom: 30px;">
              🧪 Test Email
            </h1>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Email Configuration Test</h2>
              <p style="margin: 10px 0;">
                This is a test email to verify that your SMTP configuration is working correctly.
              </p>
              <p style="margin: 10px 0;">
                If you're seeing this email, it means your email configuration is set up correctly!
              </p>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
              <p style="margin: 0; color: #155724;">
                <strong>📅 Test Date:</strong> ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        Test Email - Recruitment Realities
        
        Email Configuration Test
        
        This is a test email to verify that your SMTP configuration is working correctly.
        If you're seeing this email, it means your email configuration is set up correctly!
        
        Test Date: ${new Date().toLocaleString()}
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Test email sent:', info.messageId);

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully',
      messageId: info.messageId,
      recipient: process.env.NOTIFICATION_EMAIL || 'recruitment@wenext.africa'
    });

  } catch (error) {
    console.error('Test email error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred';
    
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send test email',
      details: errorMessage
    }, { status: 500 });
  }
}