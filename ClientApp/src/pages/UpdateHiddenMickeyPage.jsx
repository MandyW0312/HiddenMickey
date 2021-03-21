import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export function UpdateHiddenMickeyPage() {
  const params = useParams()

  const [mickey, setMickey] = useState({
    id: undefined,
    location: '',
    clue: '',
    hint: '',
    areaOfTheParkId: undefined,
  })

  const [area, setArea] = useState({
    id: undefined,
    name: '',
    parkId: undefined,
  })

  const [park, setPark] = useState({
    id: undefined,
    name: '',
  })

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(
    function () {
      async function fetchMickey() {
        // @ts-ignore
        const response = await fetch(`/api/HiddenMickeys/${params.id}`)
        const json = await response.json()
        setMickey(json)
      }
      fetchMickey()
    },
    // @ts-ignore
    [params.id]
  )

  useEffect(
    function () {
      if (mickey.areaOfTheParkId === undefined) {
        return
      }
      async function fetchArea() {
        const response = await fetch(
          `/api/AreaOfTheParks/${mickey.areaOfTheParkId}`
        )
        const json = await response.json()
        setArea(json)
      }
      fetchArea()
    },
    [mickey.areaOfTheParkId]
  )

  useEffect(
    function () {
      if (area.parkId === undefined) {
        return
      }
      async function fetchPark() {
        const response = await fetch(`/api/Parks/${area.parkId}`)
        const json = await response.json()
        setPark(json)
      }
      fetchPark()
    },
    [area.parkId]
  )

  const handleFieldChange = (event) => {
    const value = event.target.value
    const field = event.target.name

    const updatedMickey = { ...mickey, [field]: value }
    setMickey(updatedMickey)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch(`/api/HiddenMickeys/${mickey.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(mickey),
    })

    if (response.status === 400) {
      const json = await response.json()

      setErrorMessage(Object.values(json.errors).join(' '))
    }

    // @ts-ignore
    window.location.assign(`/update/${params.id}`)
  }

  return (
    <>
      <header className="update-header">
        <h2>Hidden Mickey #{mickey.id}</h2>
      </header>
      <p className="update-message">Thank you for updating our error!</p>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <ul className="update-mickey">
        <li>Park: {park.name}</li>
        <li>Area: {area.name}</li>
        <form>
          <li>
            <label htmlFor="location">Location: </label>
            <textarea
              // @ts-ignore
              rows="5"
              // @ts-ignore
              cols="30"
              name="location"
              value={mickey.location}
              onChange={handleFieldChange}
            ></textarea>
          </li>
          <li>
            <label htmlFor="clue">Clue: </label>
            <textarea
              // @ts-ignore
              rows="10"
              // @ts-ignore
              cols="30"
              name="clue"
              value={mickey.clue}
              onChange={handleFieldChange}
            ></textarea>
          </li>
          <li>
            <label htmlFor="hint">Hint: </label>
            <textarea
              // @ts-ignore
              rows="10"
              // @ts-ignore
              cols="30"
              name="hint"
              value={mickey.hint}
              onChange={handleFieldChange}
            ></textarea>
          </li>
        </form>
      </ul>
      <article className="buttons">
        <button className="update-buttons" onClick={handleFormSubmit}>
          Submit
        </button>
        <button className="update-buttons">
          <Link to={'/'}>Home</Link>
        </button>
      </article>
    </>
  )
}
