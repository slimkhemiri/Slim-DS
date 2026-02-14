# Premium Features Setup Guide

This guide will help you set up premium features with Stripe payments for the Slim Design System.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Node.js and npm installed
3. Vercel account (for deployment) or another hosting platform

## Setup Steps

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install @stripe/stripe-js stripe
```

### 2. Configure Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Get your **Publishable Key** (starts with `pk_test_` for test mode)
3. Get your **Secret Key** (starts with `sk_test_` for test mode)

### 3. Create Stripe Products and Prices

1. In Stripe Dashboard, go to **Products**
2. Create products for each plan:
   - **Pro Plan**: $19/month
   - **Enterprise Plan**: $99/month
3. For each product, create a **Price** (recurring monthly subscription)
4. Copy the **Price IDs** (they look like `price_xxxxx`)

### 4. Update Price IDs

Edit `src/pages/PricingPage.tsx` and update the `priceId` fields:

```typescript
{
  id: "pro",
  name: "Pro",
  price: 19,
  priceId: "price_YOUR_PRO_PRICE_ID", // Replace this
  // ...
}
```

### 5. Set Environment Variables

#### For Local Development

Create a `.env` file in the root directory:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

#### For Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the same variables:
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`

### 6. Set Up Stripe Webhook

1. In Stripe Dashboard, go to **Developers > Webhooks**
2. Click **Add endpoint**
3. Set the endpoint URL to: `https://your-domain.com/api/webhook/stripe`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add it to your environment variables as `STRIPE_WEBHOOK_SECRET`

### 7. Update API Routes

The API routes are located in the `api/` directory:
- `api/checkout/create-session.ts` - Creates Stripe checkout sessions
- `api/webhook/stripe.ts` - Handles Stripe webhooks
- `api/subscription/status.ts` - Checks subscription status

**Important**: In production, you should:
- Store user subscriptions in a database
- Update user premium status when webhooks are received
- Implement proper authentication

### 8. Test the Integration

1. Use Stripe test cards: https://stripe.com/docs/testing
2. Test card: `4242 4242 4242 4242`
3. Use any future expiry date and any CVC

## Using Premium Features

### Protect Components with PremiumGate

```tsx
import { PremiumGate } from "../components";

function MyPremiumComponent() {
  return (
    <PremiumGate featureName="Advanced Components">
      <div>
        {/* Your premium content here */}
      </div>
    </PremiumGate>
  );
}
```

### Check Premium Status

```tsx
import { useAuth } from "../contexts/AuthContext";

function MyComponent() {
  const { user } = useAuth();
  
  if (user?.isPremium) {
    // Show premium features
  }
}
```

## Features Included

✅ User authentication context
✅ Pricing page with subscription plans
✅ Stripe checkout integration
✅ Premium feature gating
✅ Subscription status checking
✅ Webhook handling for subscription events
✅ User menu in header
✅ Premium features showcase page

## Next Steps

1. **Database Integration**: Store user data and subscriptions in a database
2. **Email Notifications**: Send welcome emails when users subscribe
3. **Subscription Management**: Add a page for users to manage their subscriptions
4. **Analytics**: Track subscription conversions
5. **Testing**: Add unit and integration tests

## Support

For issues or questions:
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
