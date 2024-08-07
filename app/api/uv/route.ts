import { NextResponse } from "next/server"

export async function GET(req:NextResponse) {
  try {
    const lat = 25.4166
    const lon = 85.1666 

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&daily=uv_index_max,uv_index_clear_sky_max`

    const res = await fetch(url, {
      next: { revalidate: 900 },
    })

    const uvData = await res.json()

    return NextResponse.json(uvData);
  } catch (error) {
    console.log("Error Getting UV Data");

    return new Response("Error getting UV Data", { status: 500 })
  }
}