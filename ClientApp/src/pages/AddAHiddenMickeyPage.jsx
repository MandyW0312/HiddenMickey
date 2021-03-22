import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function AddAHiddenMickeyPage() {
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

  const [addedMickey, setAddedMickey] = useState({
    location: '',
    clue: '',
    hint: '',
    areaOfTheParkId: 0,
  })

  useEffect(function () {
    async function fetchParks() {
      const response = await fetch('/api/Parks')
      const json = await response.json()
      setParks(json)
    }
    fetchParks()
  }, [])

  const [parkDropdownShown, setParkDropdownShown] = useState(false)
  const [areaDropdownShown, setAreaDropdownShown] = useState(false)

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const newMickeyInfo = {
      ...addedMickey,
      [fieldName]: value,
    }

    setAddedMickey(newMickeyInfo)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/HiddenMickeys', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(addedMickey),
    })

    const json = await response.json()

    if (response.status === 400) {
      setErrorMessage(Object.values(json.errors).join(' '))
    } else {
      setAddedMickey({
        location: '',
        clue: '',
        hint: '',
        areaOfTheParkId: undefined,
      })
      setMessage(
        'Thank you for adding another Hidden Mickey to our collection!!!'
      )
    }
  }

  return (
    <>
      <header className="add-header">
        <h2>Add a Hidden Mickey</h2>
        <span>{message}</span>
      </header>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form>
        <ul className="add-form">
          <li>
            <div className="dropdown">
              <button
                className="dropdown-parksb-add"
                onClick={function (event) {
                  event.preventDefault()
                  setParkDropdownShown(!parkDropdownShown)
                }}
              >
                Park Name
              </button>
              <div
                className={`dropdown-parksc-add ${
                  parkDropdownShown ? 'show' : ''
                }`}
              >
                {parks.map(function (park) {
                  return (
                    <button
                      className="click"
                      key={park.id}
                      onClick={function (event) {
                        event.preventDefault()
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
          </li>
          <li>
            <div className="dropdown">
              <button
                className="dropdown-areasb-add"
                onClick={function (event) {
                  event.preventDefault()
                  setAreaDropdownShown(!areaDropdownShown)
                }}
              >
                Area of the Park
              </button>
              <div
                className={`dropdown-areasc-add ${
                  areaDropdownShown ? 'show' : ''
                }`}
              >
                {selectedPark.areaOfTheParks.map(function (area) {
                  return (
                    <button
                      className="click"
                      key={area.id}
                      onClick={function (event) {
                        event.preventDefault()
                        setSelectedArea(area)
                        setAddedMickey({
                          ...addedMickey,
                          areaOfTheParkId: area.id,
                        })
                        setAreaDropdownShown(false)
                      }}
                    >
                      {area.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </li>

          <li>
            <label htmlFor="location">Location: </label>
            <textarea
              className="add-text"
              // @ts-ignore
              rows="2"
              // @ts-ignore
              cols="30"
              name="location"
              value={addedMickey.location}
              onChange={handleStringFieldChange}
              placeholder="Ride Name, Restaurant Name, Shop Name..."
            ></textarea>
          </li>
          <li>
            <label htmlFor="clue">Clue: </label>
            <textarea
              className="add-text"
              // @ts-ignore
              rows="10"
              // @ts-ignore
              cols="30"
              name="clue"
              value={addedMickey.clue}
              onChange={handleStringFieldChange}
              placeholder="General area of where the Hidden Mickey is..."
            ></textarea>
          </li>
          <li>
            <label htmlFor="hint">Hint: </label>
            <textarea
              className="add-text"
              // @ts-ignore
              rows="10"
              // @ts-ignore
              cols="30"
              name="hint"
              value={addedMickey.hint}
              onChange={handleStringFieldChange}
              placeholder="More specific to where the Hidden Mickey is..."
            ></textarea>
          </li>
        </ul>
      </form>
      <article className="buttons">
        <button onClick={handleFormSubmit} className="add-page">
          Submit
        </button>
        <button className="add-page">
          <Link to={'/'}>Home</Link>
        </button>
      </article>
    </>
  )
}
