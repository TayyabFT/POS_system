import Stripe from 'stripe';

// Check if Stripe secret key is properly configured
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey || stripeSecretKey === 'sk_test_YOUR_TEST_SECRET_KEY_HERE') {
  console.error('Stripe secret key not configured properly. Please update your .env.local file with a valid test secret key.');
}

const stripe = new Stripe(stripeSecretKey);

export async function POST(request) {
  try {
    // Check if Stripe secret key is configured
    if (!stripeSecretKey || stripeSecretKey === 'sk_test_YOUR_TEST_SECRET_KEY_HERE') {
      return Response.json(
        { error: 'Stripe secret key not configured. Please update your .env.local file with a valid test secret key.' },
        { status: 500 }
      );
    }

    const { amount, currency = 'usd', metadata = {} } = await request.json();

    // Validate amount
    if (!amount || amount < 50) { // Minimum $0.50
      return Response.json(
        { error: 'Invalid amount. Minimum amount is $0.50.' },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata,
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create payment intent';
    if (error.message) {
      errorMessage = error.message;
    }
    
    return Response.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
