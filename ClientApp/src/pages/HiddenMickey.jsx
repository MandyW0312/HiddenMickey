import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function HiddenMickey() {
  const [mickey, setMickey] = useState({
    id: undefined,
  })

  const params = useParams()

  useEffect(
    function () {
      async function fetchMickey() {
        const response = await fetch(`/api/HiddenMickeys/${params.id}`)
        const json = await response.json()
        setMickey(json)
      }
      fetchMickey()
    },
    [params.id]
  )

  return (
    <>
      <header className="specific-header">
        <h2>Hidden Mickey #{mickey.id}</h2>
      </header>
      <ul className="specific-mickey">
        <li>Park: Magic Kingdom</li>
        <li>Area: Main Street USA</li>
        <li>Location: Railroad Station</li>
        <li>Clue: {mickey.clue}</li>
        <li>Hint: {mickey.hint}</li>
      </ul>
      <article className="buttons">
        <button className="specific-buttons">Delete</button>
        <button className="specific-buttons">
          <Link to={'/home'}>Home</Link>
        </button>
        <button className="specific-buttons">
          <Link to={'/update/:id'}>Update</Link>
        </button>
      </article>
    </>
  )
}
