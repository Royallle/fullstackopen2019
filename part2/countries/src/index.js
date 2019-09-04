import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect  } from 'react'
import axios from 'axios'

const Filter = ({filter,setFilter}) => {

    const handleFilterChange = (event) =>  {
        setFilter(event.target.value);
    }  

    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange} />
        </div>       
    )
}

const Weather = ({country}) => {
    const [weather,setWeather] = useState({})
    const apiKey = '69850e5237a14bada04213345190309';

    useEffect(() => {
        axios
          .get('https://api.apixu.com/v1/current.json?key='+apiKey+'&q='+country.capital)
          .then(response => {
              console.log(JSON.stringify(response.data));
            setWeather(response.data)
          })
    }, [country])  

    if(Object.entries(weather).length === 0 && weather.constructor === Object) {
        return null;
    } else {
        console.log(JSON.stringify(weather));
        return (
            <div>
                <b>Temperature: </b> {weather.current.temp_c} Celsius
                <div>
                    <img src={weather.current.condition.icon} alt="icon_weather" width="50px" height="50px" ></img>
                </div>
                <b>wind: </b> {weather.current.wind_kph} kph direction {weather.current.wind_dir} 
            </div>        
        )
    }
}

const Country = ({country}) => {


    const getLanguages = () => {
        return (country.languages).map(language => <li key={language.name}>{language.name}</li>)
    }

    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>

            <h2>Languages:</h2>
            <ul>
                {getLanguages()}
            </ul>

            <div>
                <img src={country.flag} alt="flag" width="200px" height="125px" ></img>
            </div>

            <Weather country={country} />

        </div>
    )
}

const Countries = ({filter,countries,setFilter}) => {

    const selectCountry = ({country}) => {
        setFilter(country.name);
    }

    const filterCountries = () => {
        return (filter ? countries.filter(country => (country.name.toLocaleLowerCase()).includes(filter.toLowerCase())) : [])  
    }

    const countryRows = () => {
        let filteredCountries = filterCountries();
        
        if(filteredCountries.length === 1) {
            return (
                <Country country={filteredCountries[0]}/>
            )
        
        } else if ( filteredCountries.length > 1) {
            return filteredCountries.map((country,i) => (   <div key={country.name}>                                                                
                                                                {country.name}  <button key={i} onClick={() => selectCountry({country})}>show</button>
                                                            </div>
                                                        ))
        } else {
            return null;
        }
        
    }

    return (
        <div>
            {countryRows()}
        </div>
    )
}

const App = () => {
    const [countries,setCountries] = useState([])
    const [filter,setFilter] = useState('')
    
    useEffect(() => {
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            setCountries(response.data)
          })
    }, [])

    return (
      <div>
        <Filter filter={filter} setFilter={setFilter}/>
        <Countries filter={filter} countries={countries} setFilter={setFilter}/>
      </div>
    )
  }


ReactDOM.render(<App />, document.getElementById('root'));


