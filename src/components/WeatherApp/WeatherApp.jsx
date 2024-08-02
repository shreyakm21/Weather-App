import React, { useState } from 'react'
import './WeatherApp.css'

import search from '../Assets/search.png'
import sun from '../Assets/sun.png'
import cloud from '../Assets/cloudy.png'
import drizzle from '../Assets/drizzle.png'
import rain from '../Assets/rain.png'
import snow from '../Assets/snow.png'
import wind from '../Assets/wind.png'
import humid from '../Assets/humid.png'
import RAIN from '../Assets/Rain1.jpg'
import DRIZZLE from '../Assets/Drizzle1.jpg'
import SNOW from '../Assets/Snow1.jpg'
import SUN from '../Assets/Sun1.jpg'
import CLOUD from '../Assets/Cloud1.jpg'
import ERROR from '../Assets/error.jpg'
import GHOST from '../Assets/ghost.jpg'

const WeatherApp = () => {

    let apiKey="c60c91918c57edaf9057091460a056e2";

    const [icon,seticon] = useState(cloud);
    const[bcg,setbcg] = useState(RAIN);
    
    //State={message: ""};
    //const [State,setState] = useState("");

    const searchbar=async()=>{
        const element=document.getElementsByClassName("cityInput");
        if (element[0].value===""){
            return 0;
        }
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;
        console.log(url);

        let response = await fetch(url);
        let data = await response.json();
        //{data.name===undefined?console.log('error'):console.log(data.name)};

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temp = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        if (data.name===undefined){
            seticon(ERROR);
            setbcg(GHOST);
            temp[0].innerHTML="-- °C";
            location[0].innerHTML="Unknown";
            humidity[0].innerHTML="-- %";
            wind[0].innerHTML="-- kmph";
        }
        else{
            humidity[0].innerHTML = data.main.humidity + " %";
            wind[0].innerHTML = Math.floor(data.wind.speed) + " kmph";;
            temp[0].innerHTML = Math.floor(data.main.temp) + " °C";
            location[0].innerHTML = data.name;
    
            console.log(data.name);
            {humidity[0].innerHTML?console.log('yes') : console.log('no')};
    
            if (data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
                seticon(sun);
                setbcg(SUN);
            }
            else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
                seticon(cloud);
                setbcg(CLOUD);
            }
            else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
                seticon(drizzle);
                setbcg(DRIZZLE);
            }
            else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
                seticon(drizzle);
                setbcg(DRIZZLE);
            }
            else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
                seticon(rain);
                setbcg(RAIN);
            }
            else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
                seticon(rain);
                setbcg(RAIN);
            }
            else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
                seticon(rain);
                setbcg(RAIN);
            }
            else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
                seticon(snow);
                setbcg(SNOW);
            }
            else{
                seticon(sun);
                setbcg(SUN);
            }
    
        }

    }

    const clearAll=()=>{
        const element=document.getElementsByClassName("cityInput");
        element[0].value="";
            
    }

    function handleKeyDown(event) {
        if (event.keyCode === 13) {
          //alert('Enter key was pressed');
          searchbar();
        }
    }
    

  return (
    /*<div>
      hi onClick={()=>{searchbar()}}
    </div>*/
    <div className="hero" style={{ backgroundImage: `url(${bcg})`,backgroundRepeat: 'no-repeat',backgroundSize:'cover',backgroundPosition:'center',minHeight:'100vh' }}>
    <div className='container'>
        <div className="top-bar">
            <div className="sb">
            <input type="text" onKeyDown={handleKeyDown} className="cityInput" placeholder='Search'/>
            <span onClick={()=>{clearAll()}} id="cross">✘</span>
            </div>
            <div className="search-icon" onClick={()=>{searchbar()}}>
                <img src={search} height="30px" alt=""/>
            </div>
        </div>
        <div className="weather-img">
            <img src={icon} height="200px" alt=""/>
        </div>
        <div className="weather-temp">24 °C</div>
        <div className="weather-location">London</div>
        <div className="data-container">
            <div className="element">
                <img src={humid} height="100px" alt="" className="icon"/>
                <div className="data">
                    <div className="humidity-percent">64 %</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind} height="100px" alt="" className="icon"/>
                <div className="data">
                    <div className="wind-rate">84 kmph</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default WeatherApp
