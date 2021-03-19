import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Icon({ name, style = 'fas' }) {
  return <i className={`${style} fa-${name}`}></i>
}

export function ScavengerHunt(done) {
  const [parks, setParks] = useState([])
  const [mickeys, setMickeys] = useState([])
  const [userPressedClue, setUserPressedClue] = useState(true)

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

  // function HintModal() {
  //   return <div className="modal">{mickeyDetails.hint}</div>
  // }

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
      {/* {userPressedClue ? <HintModal /> : <> </>} */}
      <p className="disclaimer">
        Please Note: We recommend that if a Hidden Mickey is during a ride to
        click on the clue for a more specific hint before riding.
      </p>
      <ul className="scavenger-hunt">
        {mickeys.map(function (mickeyDetails) {
          return (
            <li key={mickeyDetails.id}>
              <h4>Location: {mickeyDetails.location}</h4>
              <button
                onClick={function (event) {
                  setUserPressedClue(true)
                }}
              >
                Clue:
              </button>
              {mickeyDetails.clue}
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
