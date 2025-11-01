import Stripe from 'stripe';

export async function GET() {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeSecretKey) {
      return Response.json({
        status: 'error',
        message: 'Stripe secret key not found in environment variables',
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Configured' : 'Missing',
        secretKey: 'Missing'
      }, { status: 500 });
    }

    if (stripeSecretKey === 'sk_test_YOUR_TEST_SECRET_KEY_HERE') {
      return Response.json({
        status: 'error',
        message: 'Stripe secret key is still set to placeholder value',
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Configured' : 'Missing',
        secretKey: 'Placeholder'
      }, { status: 500 });
    }

    // Test the Stripe connection
    const stripe = new Stripe(stripeSecretKey);
    
    // Try to retrieve account information to test the connection
    const account = await stripe.accounts.retrieve();
    
    return Response.json({
      status: 'success',
      message: 'Stripe configuration is working correctly',
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Configured' : 'Missing',
      secretKey: 'Configured',
      account: {
        id: account.id,
        type: account.type,
        country: account.country,
        default_currency: account.default_currency
      }
    });

  } catch (error) {
    console.error('Stripe test error:', error);
    
    return Response.json({
      status: 'error',
      message: error.message || 'Failed to connect to Stripe',
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Configured' : 'Missing',
      secretKey: process.env.STRIPE_SECRET_KEY ? 'Configured' : 'Missing',
      error: error.message
    }, { status: 500 });
  }
}
