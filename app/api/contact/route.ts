// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const toNull = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? null : (v as string | null);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      first_name,
      last_name, // optional
      email,
      phone, // optional
      service, // optional
      subject, // optional
      message,
    } = body || {};

    // Required checks (phone is no longer required)
    if (!first_name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    await prisma.contact.create({
      data: {
        first_name,
        last_name: toNull(last_name),
        email,
        phone: toNull(phone),
        service: toNull(service),
        subject: toNull(subject),
        message,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
