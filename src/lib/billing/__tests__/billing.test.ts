import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

describe("billing/razorpay", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env.RAZORPAY_KEY_ID = "rzp_key";
    process.env.RAZORPAY_KEY_SECRET = "rzp_secret";
  });

  it("creates an order with selected plan pricing", async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ id: "order_1" }) });
    const mod = await import("../razorpay");
    const result = await mod.createRazorpayOrder("pro", "user-1");
    expect(result).toEqual({ id: "order_1" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.razorpay.com/v1/orders",
      expect.objectContaining({ method: "POST" })
    );
    const call = fetchMock.mock.calls[0][1];
    expect(call.headers.Authorization).toContain("Basic ");
    expect(JSON.parse(call.body).amount).toBe(mod.PLAN_PRICES.pro);
  });

  it("throws when order creation fails", async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, text: async () => "bad request" });
    const mod = await import("../razorpay");
    await expect(mod.createRazorpayOrder("basic", "u")).rejects.toThrow("Razorpay order creation failed: bad request");
  });

  it("verifies valid and invalid payment signatures", async () => {
    const mod = await import("../razorpay");
    const crypto = await import("crypto");
    const valid = crypto.createHmac("sha256", "rzp_secret").update("order|pay").digest("hex");
    await expect(mod.verifyPaymentSignature("order", "pay", valid)).resolves.toBe(true);
    await expect(mod.verifyPaymentSignature("order", "pay", "abcd")).resolves.toBe(false);
  });

  it("returns null for non-ok payment fetch", async () => {
    fetchMock.mockResolvedValueOnce({ ok: false });
    const mod = await import("../razorpay");
    await expect(mod.fetchPayment("pay_1")).resolves.toBeNull();
  });

  it("isConfigured reflects env presence", async () => {
    const mod = await import("../razorpay");
    expect(mod.isConfigured()).toBe(true);
    vi.resetModules();
    delete process.env.RAZORPAY_KEY_ID;
    delete process.env.RAZORPAY_KEY_SECRET;
    const mod2 = await import("../razorpay");
    expect(mod2.isConfigured()).toBe(false);
  });
});
