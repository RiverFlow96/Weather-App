import { useEffect, useState, type FormEvent } from 'react'
import './Card.css'

const Card = () => {

    const [city, setCity] = useState('')
    const [temp, setTemp] = useState('')
    const [codeWeather, setCodeWeather] = useState('')
    const [humidity, setHumidity] = useState('')
    const [weatherMain, setWeatherMain] = useState('')
    const [weatherDescription, setWeatherDescription] = useState('')
    const [error, setError] = useState('')

    const showWeather = async (event: FormEvent) => {
        event.preventDefault()
        if (!city) return
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d19893e0c02086e19e8477f5ba04e23&units=metric&lang=es`)
            if (!response.ok) throw new Error("Error http: " + response.status)

            const data = await response.json()

            setTemp(data.main.temp)
            setWeatherMain(data.weather[0].main)
            setCodeWeather(data.weather[0].icon)
            setWeatherDescription(data.weather[0].description)
            setHumidity(data.main.humidity)
        } catch (error) {
            setError(error.message)
        }

    }

    return (
        <div className={`bg-neutral-700 justify-center p-3 items-center flex flex-col w-[25dvw] h-[55dvh] rounded-2xl text-white`}>
            <div>
                <form className="flex flex-col " onSubmit={showWeather}>
                    <input
                        placeholder="Ciudad..."
                        type="text"
                        value={city}
                        className="bg-white my-3 w-[20dvw] h-[2dvw] rounded-2xl text-black p-2 placeholder:text-neutral-500"
                        onChange={(event) => {
                            setCity(event.target.value)
                            if (event.target.value == '') {
                                setCodeWeather('')
                                setHumidity('')
                                setTemp('')
                                setWeatherDescription('')
                                setWeatherMain('')
                            }
                        }}
                    />
                </form>
            </div>
            {codeWeather && <img className='bg-white rounded-2xl' src={`https://openweathermap.org/img/wn/${codeWeather}@2x.png`} alt="Clima Icon" />}
            <h2 className='font-bold text-2xl'>{city && `Ciudad: ${city}`}</h2>
            <h1 className='font-bold text-5xl'>{temp && `${temp}°C`}</h1>
            <h2 className='font-bold text-2xl'>{weatherMain && `Clima: ${weatherMain}`}</h2>
            <h2 className='font-bold text-2xl'>{weatherDescription && `Description: ${weatherDescription}`}</h2>
            <h2 className='font-bold text-2xl'>{humidity && `Humedad: ${humidity}%`}</h2>

            {error && <h2 className='font-bold text-2xl text-red-800'>{error}</h2>}

        </div>
    )
}

export default Card