import connectDB from "@/config/database";
import Subscription from "@/models/subscription";
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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { trainee, year, date, monthsSelected, subscriptionType, amount } = await request.json();
  
  
  await connectDB();
  const updatedSubscription = await Subscription.findByIdAndUpdate(id, {
    trainee,
    year,
    date,
    monthsSelected,
    subscriptionType,
    amount
  }, { new: true });

  

  let response = NextResponse.json({ message: "Subscription updated" }, { status: 200 });
  setCORSHeaders(response);
  return response;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await connectDB();
  const subscription = await Subscription.findOne({ _id: id });
  
 

  let response = NextResponse.json({ subscription }, { status: 200 });
  setCORSHeaders(response);
  return response;
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await connectDB();
    const deletedSubscription = await Subscription.findByIdAndDelete(id);

    if (!deletedSubscription) {
      let response = NextResponse.json({ message: "Subscription not found" }, { status: 404 });
      setCORSHeaders(response);
      return response;
    }

    console.log("Deleted subscription:", deletedSubscription);

    let response = NextResponse.json({ message: "Subscription deleted" }, { status: 200 });
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to delete subscription:", error);
    let response = NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    setCORSHeaders(response);
    return response;
  }
}
