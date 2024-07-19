import connectDB from "@/config/database";
import Subscription from "@/models/subscription";
import { NextRequest, NextResponse } from "next/server";

// Function to set CORS headers
async function setCORSHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS, PUT');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

// OPTIONS method to handle CORS preflight requests
export async function OPTIONS() {
  let response = NextResponse.json({}, { status: 200 });
  setCORSHeaders(response);
  return response;
}


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectDB();
    const subscription = await Subscription.findById(id)
;

    if (!subscription) {
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }

    let response = NextResponse.json({ subscription }, { status: 200 });
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to get subscription:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const {
      trainee,
    year,
    date,
    monthsSelected,
    subscriptionType,
    amount
    } = await request.json();

    await connectDB();
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      {
        trainee,
       year,
      date,
      monthsSelected,
      subscriptionType,
      amount
      },
      { new: true }
    );

    if (!updatedSubscription) {
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }

    let response = NextResponse.json({ message: "Subscription updated", updatedSubscription }, { status: 200 });
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to update subscription:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectDB();
    const deletedSubscription = await Subscription.findByIdAndDelete(id)
;

    if (!deletedSubscription) {
      return NextResponse.json({ message: "Subscription not found" }, { status: 404 });
    }

    let response = NextResponse.json({ message: "Subscription Deleted" }, { status: 200 });
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to delete subscription:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// Add the new runtime configuration
export const runtime = 'nodejs';