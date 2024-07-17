import subscriptionModel from "@/models/subscription";
import connectDB from "@/config/database";
import { NextResponse } from "next/server";

async function setCORSHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function OPTIONS() {
  let response = NextResponse.json({}, { status: 200 });
  setCORSHeaders(response);
  return response;
}

export async function POST(request: Request) {
  try {
    const { trainee, year, date, monthsSelected, subscriptionType, amount } = await request.json();
    
   

    await connectDB();
    const newSubscription = await subscriptionModel.create({
      trainee,
      year,
      date,
      monthsSelected,
      subscriptionType,
      amount
    });

    

    let response = NextResponse.json({ message: "Subscription Created" }, { status: 201 });
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to create subscription:", error);
    let response = NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    setCORSHeaders(response);
    return response;
  }
}

export async function GET() {
  try {
    await connectDB();
    const subscriptions = await subscriptionModel.find();


    let response = NextResponse.json({ subscriptions }, { status: 200 });
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to get subscriptions:", error);
    let response = NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    setCORSHeaders(response);
    return response;
  }
}
