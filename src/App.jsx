import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './assets/useFetch'
import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'

function App() {
  const [inputValue, setInputValue ] =useState(getRandomNumber(126))

 // const numberRandos = getRandomNumber(126)
  const url = `https://rickandmortyapi.com/api/location/${inputValue || 'hola'}`
  const [location, getLocation, hasError ] = useFetch(url)

  useEffect(()  => {
    getLocation()
  }, [inputValue])

  const inputSearch = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputSearch.current.value.trim())
  }

  const residents = location?.residents || [];

  const residentsGroups = [];
  for (let i = 0; i < residents.length; i += 3) {
    residentsGroups.push(residents.slice(i, i + 3));
  }

  return (
    <div>
      <div className="container">
        <h1> Rick and Morty app </h1>
        <form onSubmit={handleSubmit}>
          <input ref={inputSearch}  type="text" />
          <button>Seaech</button>
        </form>
      </div>
      
      {
      hasError
         ? <h2><h2>❌ Hey! you must provide an id from 1 to 126 😭</h2></h2>
         : <>
      
      <LocationInfo location={location} />
      <div className="resident-columns">
        {residentsGroups.map((group, index) => (
          <div key={index} className="resident-column">
            {group.map((url) => (
              <ResidentCard key={url} url={url} />
            ))}
          </div>
        ))}
      </div>
    </>
    }
    </div>
  
  )
}

export default App
