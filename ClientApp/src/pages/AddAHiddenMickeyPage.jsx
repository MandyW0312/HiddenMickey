import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export function AddAHiddenMickeyPage() {
  const [newMickey, setNewMickey] = useState({
    clue: '',
    hint: '',
  })

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
    console.log(json)
  }

  return (
    <>
      <header>
        <h2>Add a Hidden Mickey</h2>
      </header>
      <form>
        <ul className="hidden-mickey">
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
              rows="2"
              cols="30"
              name="location"
              placeholder="Ride Name, Restaurant Name, Shop Name..."
            ></textarea>
          </li>
          <li>
            <label htmlFor="clue">Clue: </label>
            <textarea
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
        <button onClick={handleFormSubmit}>Submit</button>
        <button>
          <Link to={'/home'}>Home</Link>
        </button>
      </article>
    </>
  )
}
