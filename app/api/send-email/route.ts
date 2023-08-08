import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const config = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
};

export async function POST(req: Request) {
  const { to, subject, html } = await req.json();

  try {
    const transporter = nodemailer.createTransport(config);
    let message = {
      from: process.env.EMAIL_ADDRESS,
      to,
      subject,
      html,
    };

    const transporterResponse = await transporter.sendMail(message);
    console.log(transporterResponse);

    return NextResponse.json({ message: "email sent!" });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
