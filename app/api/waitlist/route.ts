import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

export async function POST(request: NextRequest) {
  try {
    const { email, phone, userType } = await request.json();

    // Validate required fields
    if (!email || !userType) {
      return NextResponse.json(
        { success: false, error: 'Email and user type are required' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransporter(emailConfig);

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'recruitment@wenext.africa',
      subject: '🚀 New Waitlist Signup - Recruitment Realities',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #ff6b35; text-align: center; margin-bottom: 30px;">
              🎉 New Waitlist Signup!
            </h1>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Contact Information</h2>
              <p style="margin: 10px 0;"><strong>📧 Email:</strong> ${email}</p>
              ${phone ? `<p style="margin: 10px 0;"><strong>📱 Phone:</strong> ${phone}</p>` : ''}
              <p style="margin: 10px 0;"><strong>👤 User Type:</strong> ${userType}</p>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
              <p style="margin: 0; color: #155724;">
                <strong>📅 Signup Date:</strong> ${new Date().toLocaleString()}
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                This email was automatically generated from your Recruitment Realities waitlist form.
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        New Waitlist Signup - Recruitment Realities
        
        Contact Information:
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
        User Type: ${userType}
        
        Signup Date: ${new Date().toLocaleString()}
        
        This email was automatically generated from your Recruitment Realities waitlist form.
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email. Please try again later.' 
      },
      { status: 500 }
    );
  }
}