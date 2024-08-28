import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [responsechatgpt, setchatresponse] = useState({});

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  const sendToChatGpt = async (userPrompt) => {
    

    console.log("userprompt is -----------", userPrompt)

    const userData = {
      userPrompt: userPrompt
    };

    axios.post("http://localhost:8000/submit", userData)

    setTimeout(() => {
      console.log('Waited for 0.5 seconds');
    }, 500);



    try {
      const response = await axios.get(`http://localhost:8000/message`);
      setchatresponse({chatGptResponse: response.data.message});
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }

    
  };


  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Dhaka");
  }, []);

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            {" "}
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={search}
            />
          </div>
        </div>
        <ul>
          {typeof weather.main != "undefined" ? (
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>


              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>

    
    <button onClick= {() => sendToChatGpt(`The weather in ${weather.name} is ${Math.round(weather.main.temp)}°C with ${Math.round(weather.main.humidity)}% humidity. In addition the wind speed ${Math.round(weather.wind.speed)} Km/h and visibility is ${Math.round(weather.visibility)} mi. Is  Any suggestions?`)}>Tap here for more information</button>
    { responsechatgpt && (
      <div>
        <pre style={{ whiteSpace: 'pre-line', textAlign: 'left', color: 'white', marginTop: '20px', padding: '10px' }}>{responsechatgpt.chatGptResponse}</pre>
      </div>
    )}
    </div>

  );
}
export default Forcast;
