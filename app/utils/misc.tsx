import moment from "moment"

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15)
}

export const unixToTime = (unix: number, timezone: number) => {
  return moment
  .unix(unix)
  .utcOffset(timezone/60)
  .format("HH:mm:ss")
}


export const airQualityIndexText = [
  {
    rating: 20,
    description: "good"
  },
  {
    rating: 40,
    description: "fair"
  },
  {
    rating: 60,
    description: "moderate"
  },
  {
    rating: 80,
    description: "poor"
  },
  {
    rating: 100,
    description: "extremly Poor"
  }
]