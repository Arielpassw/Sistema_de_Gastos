import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
    createCheckoutSession,
    stripeWebhook
} from "../controllers/payments.controller.js";

const router = express.Router();

// WEBHOOK
router.post(
    "/webhook",
    stripeWebhook
);

// CHECKOUT
router.post(
    "/create-checkout-session",
    authMiddleware,
    createCheckoutSession
);

export default router;