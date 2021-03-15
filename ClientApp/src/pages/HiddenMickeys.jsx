import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function HiddenMickeys() {
  const [mickeys, setMickeys] = useState({})
  const [parks, setParks] = useState([])
  const [selectedPark, setSelectedPark] = useState({
    name: '',
    areaOfTheParks: [],
  })

  const [selectedArea, setSelectedArea] = useState({
    id: undefined,
    name: '',
    hiddenMickeys: [],
  })

  const [parkDropdownShown, setParkDropdownShown] = useState(false)
  const [areaDropdownShown, setAreaDropdownShown] = useState(false)

  useEffect(function () {
    async function fetchParks() {
      const response = await fetch('/api/Parks')
      const json = await response.json()
      setParks(json)
    }
    fetchParks()
  }, [])

  useEffect(
    function () {
      async function fetchMickeys() {
        const response = await fetch(
          `/api/HiddenMickeys?areaId=${selectedArea.id}`
        )
        const json = await response.json()
        setMickeys(json)
      }
      fetchMickeys()
    },
    [selectedArea.id]
  )

  return (
    <>
      <header className="list-header">
        <h2>View All Hidden Mickeys</h2>
      </header>
      <article className="hmDropdown">
        <div className="dropdown">
          <button
            className="dropdown-parksb"
            onClick={function () {
              setParkDropdownShown(!parkDropdownShown)
            }}
          >
            Park Name
          </button>
          <div className={`dropdown-parksc ${parkDropdownShown ? 'show' : ''}`}>
            {parks.map(function (park) {
              return (
                <button
                  key={park.id}
                  onClick={function () {
                    setSelectedPark(park)
                    setParkDropdownShown(false)
                  }}
                >
                  {park.name}
                </button>
              )
            })}
          </div>
        </div>
        <div className="dropdown">
          <button
            className="dropdown-areasb"
            onClick={function () {
              setAreaDropdownShown(!areaDropdownShown)
            }}
          >
            Area of the Park
          </button>
          <div className={`dropdown-areasc ${areaDropdownShown ? 'show' : ''}`}>
            {selectedPark.areaOfTheParks.map(function (area) {
              return (
                <button
                  key={area.id}
                  onClick={function () {
                    setSelectedArea(area)
                    setAreaDropdownShown(false)
                  }}
                >
                  {area.name}
                </button>
              )
            })}
          </div>
        </div>
      </article>

      <ul className="results" key={mickeys.id}>
        {Object.entries(mickeys).map(function ([mickeyCode, mickeyDetails]) {
          return (
            <li>
              <h4>Location: {mickeyDetails.location} </h4>
              <p>
                <Link to={`/HiddenMickeys/${mickeyDetails.id}`}>Clue: </Link>
                {mickeyDetails.clue}
              </p>
            </li>
          )
        })}
      </ul>
      <article className="buttons">
        <button className="list-page-home">
          <Link to={'/home'}>Home</Link>
        </button>
      </article>
    </>
  )
}
