import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-07-29.dahlia",
  });

  try {
    const body = await request.json();
    const { userId, date, time, duration, type, service, serviceName, price, currency } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency || "czk",
            product_data: {
              name: serviceName,
              description: `${duration} min — ${type === "online" ? "Online" : "In-person"} — ${date} ${time}`,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/dashboard/coaching?success=true`,
      cancel_url: `${request.headers.get("origin")}/dashboard/coaching?cancelled=true`,
      metadata: { userId, date, time, duration: String(duration), type, service, price: String(price) },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
