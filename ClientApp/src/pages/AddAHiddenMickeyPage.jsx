import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export function AddAHiddenMickeyPage() {
  const [newMickey, setNewMickey] = useState({
    location: '',
    clue: '',
    hint: '',
  })

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedMickey = { ...newMickey, [fieldName]: value }

    setNewMickey(updatedMickey)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/HiddenMickeys', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newMickey),
    })

    const json = await response.json()

    if (response.status === 400) {
      setErrorMessage(Object.values(json.errors).join(' '))
    } else {
      setNewMickey({
        location: '',
        clue: '',
        hint: '',
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
              <span>Park Name</span>
              <div className="dropdown-content">
                <p>Magic Kingdom</p>
                <p>Epcot</p>
                <p>Hollywood Studios</p>
                <p>Animal Kingdom</p>
              </div>
            </div>
          </li>
          <li>
            <div className="dropdown">
              <span>Area of the Park</span>
              <div className="dropdown-content">
                <p>Main Street USA</p>
                <p>Fantasyland</p>
                <p>Tomorrowland</p>
                <p>Adventureland</p>
                <p>Frontierland</p>
                <p>Liberty Square</p>
              </div>
            </div>
          </li>

          <li>
            <label htmlFor="location">Location: </label>
            <textarea
              className="add-text"
              rows="2"
              cols="30"
              name="location"
              value={newMickey.location}
              onChange={handleStringFieldChange}
              placeholder="Ride Name, Restaurant Name, Shop Name..."
            ></textarea>
          </li>
          <li>
            <label htmlFor="clue">Clue: </label>
            <textarea
              className="add-text"
              rows="10"
              cols="30"
              name="clue"
              value={newMickey.clue}
              onChange={handleStringFieldChange}
              placeholder="General area of where the Hidden Mickey is..."
            ></textarea>
          </li>
          <li>
            <label htmlFor="hint">Hint: </label>
            <textarea
              className="add-text"
              rows="10"
              cols="30"
              name="hint"
              value={newMickey.hint}
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
          <Link to={'/home'}>Home</Link>
        </button>
      </article>
    </>
  )
}
