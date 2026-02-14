/**
 * Razorpay client setup and utilities for ScholarSync billing.
 *
 * Environment variables required:
 *   RAZORPAY_KEY_ID
 *   RAZORPAY_KEY_SECRET
 *   RAZORPAY_WEBHOOK_SECRET
 */

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

export const PLAN_PRICES = {
  free: 0,
  basic: 100000, // INR 1,000 in paise
  pro: 200000, // INR 2,000 in paise
} as const;

export const PLAN_LABELS: Record<string, string> = {
  free: "Free",
  basic: "Basic",
  pro: "Pro",
};

function authHeader(): string {
  return "Basic " + Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");
}

export async function createRazorpayOrder(plan: "basic" | "pro", userId: string) {
  const amount = PLAN_PRICES[plan];

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt: `scholarsync_${userId}_${Date.now()}`,
      notes: { userId, plan },
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Razorpay order creation failed: ${error}`);
  }

  return res.json();
}

export async function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> {
  // Razorpay signature verification uses HMAC SHA256
  const crypto = await import("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return expectedSignature === signature;
}

export async function fetchPayment(paymentId: string) {
  const res = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    headers: { Authorization: authHeader() },
  });

  if (!res.ok) return null;
  return res.json();
}

export function isConfigured(): boolean {
  return !!(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET);
}
