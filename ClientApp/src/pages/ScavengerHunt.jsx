import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
          `/api/HiddenMickeys/Parks/${selectedPark.id}`
        )
        const json = await response.json()
        setMickeys(json)
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
      </article>
      <p className="disclaimer">
        Please Note: We recommend that if a Hidden Mickey is during a ride to
        click on the clue for a more specific hint before riding.
      </p>
      <ul className="scavenger-hunt">
        {mickeys.map(function (mickeyDetails) {
          return (
            <li key={mickeyDetails.id}>
              <h4>Location: {mickeyDetails.location}</h4>
              <p>Clue: {mickeyDetails.clue}</p>
            </li>
          )
        })}
        {/* <li>
          <h4>Location: </h4>
          <p>
            Clue: In the attraction’s 3-D film itself, there is a series of
            Hidden Mickeys. (There are 3 possible options)
          </p>
        </li>
        <li>
          <h4>Location: The Barnstormer</h4>
          <p>
            Clue: Prior to entering the queue area, take a peek at the ticket
            booth advertising the Great Goofini.
          </p>
        </li>
        <li>
          <h4>Location: Be Our Guest Restaurant</h4>
          <p>
            Clue: A classic Hidden Mickey can be found on the short rock wall to
            the left of the restaurant’s check-in desk.
          </p>
        </li> */}
      </ul>
      <article className="buttons">
        <button className="hunt-page-home">
          <Link to={'/home'}>Home</Link>
        </button>
      </article>
    </>
  )
}
