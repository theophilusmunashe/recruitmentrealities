import { NextRequest, NextResponse } from 'next/server';

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

    // Log the submission (for testing)
    console.log('📧 NEW WAITLIST SUBMISSION:');
    console.log('Email:', email);
    console.log('Phone:', phone || 'Not provided');
    console.log('User Type:', userType);
    console.log('Timestamp:', new Date().toISOString());
    console.log('---');

    // For now, just return success (without sending email)
    return NextResponse.json({ 
      success: true, 
      message: 'Form submission received successfully (email sending disabled for testing)' 
    });

  } catch (error) {
    console.error('Form submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process form submission',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}