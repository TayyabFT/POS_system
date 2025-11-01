import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    const { user_id } = params;
    const {
      store_name,
      currency,
      time_zone,
      date_format,
      show_prices_tax_inclusive,
    } = await request.json();

    // Validate required fields
    if (!store_name || !currency || !time_zone || !date_format) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields' 
        },
        { status: 400 }
      );
    }

    // Here you would typically save the settings to your database
    // For now, we'll just log the settings data
    console.log('General settings saved:', {
      user_id,
      store_name,
      currency,
      time_zone,
      date_format,
      show_prices_tax_inclusive,
      timestamp: new Date().toISOString()
    });

    // In a real application, you would:
    // 1. Save settings to database
    // 2. Update existing record or create new one
    // 3. Return success response with saved data

    return NextResponse.json({
      success: true,
      message: 'General settings saved successfully',
      data: {
        user_id,
        store_name,
        currency,
        time_zone,
        date_format,
        show_prices_tax_inclusive,
      }
    });

  } catch (error) {
    console.error('Error saving general settings:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to save general settings' 
      },
      { status: 500 }
    );
  }
}

