// Replace the hardcoded 'sk_test_...' with this:
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY is not set. Stripe calls will fail until it is configured.');
}

const stripe = new Stripe(stripeSecretKey || 'sk_test_000000000000000000000000', {
  apiVersion: '2024-06-20',
});

module.exports = stripe;
