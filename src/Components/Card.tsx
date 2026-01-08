import { useEffect, useState } from 'react'
import './Card.css'
import Inputs from './Inputs/Inputs'

const Card = () => {

    const [city, setCity] = useState('')
    const [temp, setTemp] = useState('')
    const [codeWeather, setCodeWeather] = useState('')
    const [humidity, setHumidity] = useState('')
    const [weatherMain, setWeatherMain] = useState('')
    const [weatherDescription, setWeatherDescription] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d19893e0c02086e19e8477f5ba04e23&units=metric&lang=es`)
            if (!response.ok) throw new Error("Error: " + response.status)
            const data = await response.json()

            setTemp(data.main.temp)
            setWeatherMain(data.weather[0].main)
            setCodeWeather(data.weather[0].icon)
            setWeatherDescription(data.weather[0].description)
            setHumidity(data.main.humidity)

        }
        fetchData()
    }, [])



    return (
        <div className={`bg-neutral-700 justify-center p-3 items-center flex flex-col w-[25dvw] h-[55dvh] rounded-2xl text-white`}>
            <Inputs city={setCity}></Inputs>
            {codeWeather && <img className='bg-white rounded-2xl' src={`https://openweathermap.org/img/wn/${codeWeather}@2x.png`} alt="Clima Icon" />}
            <h2 className='font-bold text-2xl'>{city && `Ciudad: ${city}`}</h2>
            <h1 className='font-bold text-5xl'>{temp == '' ? '-' : `${temp}°C`}</h1>
            <h2 className='font-bold text-2xl'>{weatherMain && `Clima: ${weatherMain}`}</h2>
            <h2 className='font-bold text-2xl'>{weatherDescription && `Description: ${weatherDescription}`}</h2>
            <h2 className='font-bold text-2xl'>{humidity && `Humedad: ${humidity}%`}</h2>
        </div>
    )
}

export default Card