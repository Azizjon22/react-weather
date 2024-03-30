import React, { useState } from 'react'
import axios from 'axios'
import './style.css'
import hova from './assets/search.png'
import clouds from './assets/blutli.png'
import humidity from './assets/namlik.png'
import wind from './assets/shomol.png'
import clear from './assets/clear.png'
import Rain from './assets/rain.png'
import Drizzle from './assets/drizz.png'
import Mist from './assets/mist.png'



const Home = () => {

    const [data, setData] = useState({
        celcius: 10,
        name: 'Uzbekistan',
        humidityy: 10,
        speed: 2,
        image: clouds
    })

    const [name, setName] = useState('')
    const [error, setError] = useState('')


    const handlerClick = () =>{
        if(name !== ''){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8d6d1d96a1e67b8081da74d186d6f27d&units=metric`;
            axios.get(apiUrl)
            .then(res => {
                let imagePath = '';
                if(res.data.weather[0].main === "Clouds"){
                    imagePath = Mist
                }else if(res.data.weather[0].main === "Clear"){
                    imagePath = clear
                } else if(res.data.weather[0].main === 'Rain') {
                    imagePath = Rain
                }else if(res.data.weather[0].main === 'Drizzle'){
                    imagePath = Drizzle
                }else if(res.data.weather[0].main === 'Mist'){
                    imagePath = Mist
                }else{
                    imagePath = Mist
                }



                setData({...data, celcius: res.data.main.temp, 
                     name: res.data.name,
                     humidityy: res.data.main.humidity,
                     speed: res.data.wind.speed, image: imagePath})
                     setError('')
            })
            .catch( err =>{
                if(err.response.status === 404){
                    setError("Invalid City Name")
                }else{
                    setError('')
                }
                 console.log(err)
            })
        }
    }


  return (
    <div className='container'>

        <div className='weather'>

            <div className='search'>
                <input type='text' placeholder='enter location' onChange={e => setName(e.target.value)}/>
                <button> <img src={hova} onClick={handlerClick} alt='search'/></button>
            </div>

            <div className='error'>
                <p>{error}</p>
            </div>

            <div className='winfo'>
                <img src={data.image} alt='clouds' className='icon'/>
                <h1>{Math.round(data.celcius)}°c</h1>
                <h2>{data.name}</h2>

                <div className='details'>
                    <div className='col'>
                        <img src={humidity} alt='Humidity'/>
                            <div className='humidity'>
                                <p>{Math.round(data.humidityy)}%</p>
                                <p>Humidity</p>
                            </div>
                    </div>

                    <div className='col'>
                    <img src={wind} alt='wind'/>
                            <div className='wind'>
                                <p>{Math.round(data.speed)} km/h</p>
                                <p>wind</p>
                            </div>
                    </div>

                </div>

            </div>

        </div>

    </div>
  )
}

export default Home