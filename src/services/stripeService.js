import { stripePromise } from '../config/stripe';

export class StripeService {
  // Create a payment intent
  static async createPaymentIntent(amount, currency = 'usd', metadata = {}) {
    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          currency,
          metadata,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      return clientSecret;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  // Process payment with Stripe
  static async processPayment(clientSecret, paymentMethod) {
    try {
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe not initialized');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod,
      });

      if (error) {
        throw new Error(error.message);
      }

      return paymentIntent;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  // Note: Payment method creation is now handled by Stripe Elements
  // This method is kept for reference but should not be used directly
  static async createPaymentMethod(cardDetails) {
    throw new Error('Please use Stripe Elements to collect card details securely');
  }

  // Get card brand from number
  static getCardBrand(number) {
    const cleanNumber = number.replace(/\s/g, '');
    
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    if (cleanNumber.startsWith('6')) return 'discover';
    
    return 'unknown';
  }

  // Validate card number using Luhn algorithm
  static validateCardNumber(number) {
    const cleanNumber = number.replace(/\s/g, '');
    
    if (!/^\d+$/.test(cleanNumber)) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }

  // Format card number with spaces
  static formatCardNumber(number) {
    const cleaned = number.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  }

  // Format expiry date
  static formatExpiryDate(expiry) {
    const cleaned = expiry.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  }
}
