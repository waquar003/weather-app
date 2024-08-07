import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
  try {
    const lat = 25.4166
    const lon = 85.1666 
    
    const apiKey = process.env.OPENWEATHERMAP_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`

    const res = await axios.get(url);

    return NextResponse.json(res.data)
  } catch (error) {
    console.log("Error fetching pollution data");
    return new Response("Error fetching pollution data", { status: 500 });
  }
}