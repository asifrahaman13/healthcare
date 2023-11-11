const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
            {
              price_data: {
                currency: 'inr',
                product_data: {
                  name: 'Your Product Name',
                },
                unit_amount: 240000, // Amount in cents, for $12.00
              },
              quantity: 1,
            },
          ],
          
        mode: 'payment',
        success_url: `${req.headers.origin}/profile/?success=true`,
        cancel_url: `${req.headers.origin}/profile/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}