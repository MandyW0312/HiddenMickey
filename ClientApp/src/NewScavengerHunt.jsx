import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export function NewScavengerHunt() {
  const [parks, setParks] = useState([])

  const [parkDropdownShown, setParkDropdownShown] = useState(false)

  const history = useHistory()

  useEffect(function () {
    async function fetchParks() {
      const response = await fetch(`/api/Parks`)
      const json = await response.json()
      setParks(json)
    }
    fetchParks()
  }, [])

  async function createScavengerHunt(park) {
    const response = await fetch(`/api/ScavengerHunts?parkId=${park.id}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    })
    const scavengerHunt = await response.json()
    history.push(`/hunt/${scavengerHunt.id}`)
  }

  return (
    <>
      <header className="new-header">
        <h2>New Scavenger Hunt</h2>
        <p>Select which Park you are in and would like a Scavenger Hunt for.</p>
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
                    createScavengerHunt(park)
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
      <p className="new-disclaimer">
        Please Note: We recommend that if a Hidden Mickey is during a ride to
        read the more specific hint before riding.
      </p>
      <article className="buttons">
        <button className="new-page-home">
          <Link to={'/home'}>Home</Link>
        </button>
      </article>
    </>
  )
}
