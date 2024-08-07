"use client"

import React, { createContext, use, useContext, useEffect, useState } from "react"
import axios from "axios";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ( {children} ) => {
  const [forecast, setForecast] = useState({});

  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});

  const [uvIndex, setUvIndex] = useState({});

  const fetchForecast = async () => {
    try {
      const res = await axios.get("api/weather");

      setForecast(res.data);
    } catch (error) {
      console.log('Error fetching forecast data: ', error.message);
    }
  };

  const fetchAirQuality = async () => {
    try {
      const res = await axios.get("api/pollution");
      console.log(res.data)
      setAirQuality(res.data);
    } catch (error) {
      console.log('Error fetching airPollution data: ', error.message);
    }
  };

  const fetchFiveDayForecast = async () => {
    try {
      const res = await axios.get("api/fiveday");

      console.log("Five Day Forecast", res.data);
      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  //fetch uv data
  const fetchUvIndex = async () => {
    try {
      const res = await axios.get("/api/uv")

      setUvIndex(res.data);
      console.log("Uv Index", res.data);
    } catch (error) {
      console.log("Error fteching the uv data: ", error);
    }
  }

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
    fetchUvIndex();
  }, []);

  return (
    <GlobalContext.Provider value={{
      forecast,
      airQuality,
      fiveDayForecast,
      uvIndex,
    }}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);