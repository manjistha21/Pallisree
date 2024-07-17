import connectDB from "@/config/database";
import Clubmember from "@/models/clubmember";
import { NextResponse } from "next/server";

async function setCORSHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
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
    const {
      image,
      name,
      address,
      gender,
      dob,
      bloodgroup,
      phoneno,
      email,
      inducername,
      induceraddress,
      joiningdate,
    } = await request.json();

    await connectDB();
    await Clubmember.create({
      image,
      name,
      address,
      gender,
      dob,
      bloodgroup,
      phoneno,
      email,
      inducername,
      induceraddress,
      joiningdate,
    });

    let response = NextResponse.json({ message: "Clubmember Created" }, { status: 201 });
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to create clubmember:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const clubmembers = await Clubmember.find();

    let response = NextResponse.json({ clubmembers });
    setCORSHeaders(response);
    return response;
  } catch (error) {
    console.error("Failed to get clubmembers:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
