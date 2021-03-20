import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Icon({ name, style = 'fas' }) {
  return <i className={`${style} fa-${name}`}></i>
}

export function ScavengerHunt() {
  const [parks, setParks] = useState([])
  const [mickeys, setMickeys] = useState([])

  const [selectedPark, setSelectedPark] = useState({
    id: undefined,
    name: '',
    areaOfTheParks: [],
  })

  const [parkDropdownShown, setParkDropdownShown] = useState(false)

  useEffect(function () {
    async function fetchParks() {
      const response = await fetch(`/api/Parks`)
      const json = await response.json()
      setParks(json)
    }
    fetchParks()
  }, [])

  useEffect(
    function () {
      if (selectedPark.id === undefined) {
        return
      }
      async function fetchMickeys() {
        const response = await fetch(
          `/api/ScavengerHunts?parkId=${selectedPark.id}`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
          }
        )
        const json = await response.json()
        setMickeys(json.scavengerHuntMickeys)
      }
      fetchMickeys()
    },
    [selectedPark.id]
  )

  console.log(mickeys)

  return (
    <>
      <header className="hunt-header">
        <h2>Scavenger Hunt</h2>
      </header>
      <article className="shDropdown">
        <div className="dropdown">
          <button
            className="dropdown-parksb-hunt"
            onClick={function () {
              setParkDropdownShown(!parkDropdownShown)
            }}
          >
            Park Name
          </button>
          <div
            className={`dropdown-parksc-hunt ${
              parkDropdownShown ? 'show' : ''
            }`}
          >
            {parks.map(function (park) {
              return (
                <button
                  key={park.id}
                  onClick={function (event) {
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
      </article>
      <p className="disclaimer">
        Please Note: We recommend that if a Hidden Mickey is during a ride to
        read the more specific hint before riding.
      </p>
      <ul className="scavenger-hunt">
        {mickeys.map(function (mickey) {
          return (
            <li key={mickey.hiddenMickey.id}>
              <h4>Location: {mickey.hiddenMickey.location}</h4>
              <p>
                <span>Clue:</span> {mickey.hiddenMickey.clue}
              </p>
              <p className="hint">
                <span>Hint:</span> {mickey.hiddenMickey.hint}
              </p>
            </li>
          )
        })}
      </ul>
      <article className="buttons">
        <button className="hunt-page-home">
          <Link to={'/home'}>Home</Link>
        </button>
      </article>
    </>
  )
}
