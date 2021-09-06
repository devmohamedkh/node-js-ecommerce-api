const stripe = require("stripe")(process.env.STRIPE_SK);

exports.checkoutSessionsCreate = async (products, req) => {
  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: products.map((p) => {
      return {
        name: p.productId.name,
        description: p.productId.description,
        amount: p.productId.price * 100,
        currency: "usd",
        quantity: p.quantity,
      };
    }),
    success_url:
      req.protocol + "://" + req.get("host") + "/api/checkout/success", // => http://localhost:3000
    cancel_url: req.protocol + "://" + req.get("host") + "/api/checkout/cancel",
  });
};
