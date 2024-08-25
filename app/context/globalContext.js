"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";
import { defaultStates } from "../utils/defaultStates";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ( {children} ) => {
  const [forecast, setForecast] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");

  const [activeCityCoords, setActiveCityCoords] = useState([25.4166, 85.1666])

  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});

  const [uvIndex, setUvIndex] = useState({});

  const fetchForecast = async (lat ,lon) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);

      setForecast(res.data);
    } catch (error) {
      console.log('Error fetching forecast data: ', error.message);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
      // console.log(res.data)
      setAirQuality(res.data);
    } catch (error) {
      console.log('Error fetching airPollution data: ', error.message);
    }
  };

  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);

      // console.log("Five Day Forecast", res.data);
      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  //geocoded list
  const fetchGeoCodedList = async (search) => {
    console.log(search);
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`)

      setGeoCodedList(res.data);
      // console.log("Geocoded List", res.data);
    } catch (error) {
      console.log("Error fetching geocoded list: ", error.message);
    }
  };

  //fetch uv data
  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`)

      setUvIndex(res.data);
      // console.log("Uv Index", res.data);
    } catch (error) {
      console.log("Error fteching the uv data: ", error);
    }
  }

  //handle inputs
  const handleInput = (event) => {
    setInputValue(event.target.value);

    if (event.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  //debounce function 
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search)
    }, 500)

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    //cleanup
    return () => debouncedFetch.cancel();
  }, [inputValue])

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider value={{
      forecast,
      airQuality,
      fiveDayForecast,
      uvIndex,
      geoCodedList,
      inputValue,
      handleInput,
      setActiveCityCoords,
    }}>
      <GlobalContextUpdate.Provider value={{setActiveCityCoords}}>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);