// This is your test secret API key.
const stripe = require("stripe")("sk_test_51LlESTC3Ie0MSAM2oIlzdRUAgMqkmXQnZLBB3no8LnVaI4akP6e3SdVopeT66PQ9QrwaLHOW9GFIFun1NAsLtaVH00OUSF7n6j");

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

export default async function handler(req, res) {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        payment_method_types: ["us_bank_account"],
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
};