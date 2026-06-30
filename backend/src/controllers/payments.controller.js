import { stripe } from "../config/stripe.js";
import { supabase } from "../config/supabase.js";

export const createCheckoutSession = async (req, res) => {

    try {

        const userId = req.user.id;

        const session = await stripe.checkout.sessions.create({

            payment_method_types: ["card"],

            mode: "payment",

            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1
                }
            ],

            success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,

            metadata: {
                userId
            }

        });

        return res.status(200).json({

            success: true,

            message: "Checkout creado correctamente",

            data: {
                url: session.url
            }

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// WEBHOOK

export const stripeWebhook = async (req, res) => {

    const signature = req.headers["stripe-signature"];

    let event;

    try {

        event = stripe.webhooks.constructEvent(

            req.body,

            signature,

            process.env.STRIPE_WEBHOOK_SECRET

        );

    } catch (err) {

        console.log(err.message);

        return res.status(400).send(`Webhook Error: ${err.message}`);

    }

    if (event.type === "checkout.session.completed") {

        const session = event.data.object;

        const userId = session.metadata.userId;

        console.log("Pago exitoso del usuario:", userId);

        const { error } = await supabase

            .from("profiles")

            .update({

                is_pro: true,

                plan: "PRO"

            })

            .eq("id", userId);

        if (error) {

            console.log(error);

        } else {

            console.log("Usuario actualizado a PRO");

        }

    }

    res.json({

        received: true

    });

};