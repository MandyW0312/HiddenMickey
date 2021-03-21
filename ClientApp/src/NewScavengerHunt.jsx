import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export function NewScavengerHunt() {
  const [parks, setParks] = useState([])
  const [scavenger, setScavenger] = useState([])

  const [selectedPark, setSelectedPark] = useState({
    id: undefined,
    name: '',
    areaOfTheParks: [],
  })

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
        setScavenger(
          json.scavengerHuntMickeys.map((mickey) => mickey.scavengerHuntId)
        )
      }
      fetchMickeys()
      history.push(`/hunt/${scavenger[0]}`)
    },
    [selectedPark.id]
  )

  return (
    <>
      <header className="hunt-header">
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
    </>
  )
}
