# Stripe Keys Setup Guide

## The Problem
You're getting the error: `No such payment_intent: 'pi_3SKQhJLmRtOJIvIx1Mr4oxxC'; a similar object exists in live mode, but a test mode key was used to make this request.`

This happens because you have a **test mode publishable key** but a **live mode secret key**. They must match!

## Current Keys in .env.local
- ✅ Publishable Key: `pk_test_...` (TEST MODE)
- ❌ Secret Key: `sk_live_...` (LIVE MODE) - This is the problem!

## Solution: Get Your Test Mode Secret Key

### Step 1: Go to Stripe Dashboard
1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Make sure you're in **Test mode** (toggle in top left should show "Test mode")

### Step 2: Get Your Test Secret Key
1. In the left sidebar, click **Developers** → **API keys**
2. You should see:
   - **Publishable key**: `pk_test_...` (this matches what you have)
   - **Secret key**: `sk_test_...` (this is what you need!)

### Step 3: Update .env.local
Replace `sk_test_YOUR_TEST_SECRET_KEY_HERE` with your actual test secret key:

```env
# Stripe Configuration
# Test Mode Keys (for development and testing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51PydV0LmRtOJIvIxNei8xyJFDKjqWMsXcqNlumjN0Y1b7DiOZUm9oB8uWItQSe4BU7GEuyoHkenR3LyfTy5ddEw800OzE2hG4M
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_TEST_SECRET_KEY_HERE
```

### Step 4: Restart Your Development Server
After updating the keys:
```bash
npm run dev
```

## Test Mode vs Live Mode

### Test Mode (Development)
- ✅ Use test card numbers
- ✅ No real money transactions
- ✅ Safe for development
- ✅ Keys start with `pk_test_` and `sk_test_`

### Live Mode (Production)
- ⚠️ Real money transactions
- ⚠️ Use only when ready for production
- ⚠️ Keys start with `pk_live_` and `sk_live_`

## Test Card Numbers
Once you have the correct test keys, use these test card numbers:

- **Visa**: `4242 4242 4242 4242`
- **Mastercard**: `5555 5555 5555 4444`
- **Amex**: `3782 822463 10005`
- **Declined**: `4000 0000 0000 0002`

Use any future expiry date and any 3-digit CVV.

## For Production
When you're ready to go live:
1. Switch to Live mode in Stripe Dashboard
2. Get your live keys
3. Update the environment variables
4. Test with small amounts first

## Need Help?
If you can't find your test secret key:
1. Check if you're in the right Stripe account
2. Make sure you're in Test mode (not Live mode)
3. Look for the "Reveal test key token" button in the API keys section
