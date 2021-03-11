import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function HiddenMickeys() {
  const [mickeys, setMickeys] = useState([])

  useEffect(function () {
    async function fetchMickeys() {
      const response = await fetch('/api/HiddenMickeys')
      const json = await response.json()
      setMickeys(json)
    }
    fetchMickeys()
  }, [])

  return (
    <>
      <header className="list-header">
        <h2>View All Hidden Mickeys</h2>
      </header>
      <article className="hmDropdown">
        <div className="dropdown">
          <span>Park Name</span>
          <div className="dropdown-content">
            <p>Magic Kingdom</p>
            <p>Epcot</p>
            <p>Hollywood Studios</p>
            <p>Animal Kingdom</p>
          </div>
        </div>
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
      </article>

      <ul className="results">
        {mickeys.map(function (mickey) {
          return (
            <li key={mickey.id}>
              <h4>Location: {mickey.location} </h4>
              <p>
                <Link to={`/HiddenMickeys/${mickey.id}`}>Clue:</Link>
                {mickey.clue}
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
