"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ( {children} ) => {
  const [forecast, setForecast] = useState({});

  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});

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

      console.log("five day forecast data: ", res.data);
      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
  }, []);

  return (
    <GlobalContext.Provider value={{
      forecast,
      airQuality,
      fiveDayForecast,
    }}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);