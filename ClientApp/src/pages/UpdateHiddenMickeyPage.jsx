import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link, useHistory } from 'react-router-dom'

export function UpdateHiddenMickeyPage() {
  const params = useParams()
  const history = useHistory()

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

  const [updatedMickey, setUpdatedMickey] = useState({
    id: mickey.id,
    location: '',
    clue: '',
    hint: '',
    areaOfTheParkId: mickey.areaOfTheParkId,
  })
  const [locationText, setLocationText] = useState('')
  const [clueText, setClueText] = useState('')
  const [hintText, setHintText] = useState('')

  useEffect(
    function () {
      async function fetchMickey() {
        // @ts-ignore
        const response = await fetch(`/api/HiddenMickeys/${params.id}`)
        const json = await response.json()
        setMickey(json)
      }
      fetchMickey()
      setLocationText(mickey.location)
      setClueText(mickey.clue)
      setHintText(mickey.hint)
    },
    // @ts-ignore
    [params.id, mickey.location, mickey.clue, mickey.hint]
  )

  useEffect(
    function () {
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
    if (field === 'location') {
      setLocationText(value)
    } else if (field === 'clue') {
      setClueText(value)
    } else if (field === 'hint') {
      setHintText(value)
    }
    const newMickey = { ...mickey, [field]: value }
    setUpdatedMickey(newMickey)
  }

  console.log(updatedMickey)

  async function handleFormSubmit(event) {
    event.preventDefault()
    console.log(updatedMickey)

    const response = await fetch(`/api/HiddenMickeys/${mickey.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(updatedMickey),
    })

    const json = await response.json()

    if (response.status === 400) {
      setErrorMessage(Object.values(json.errors).join(' '))
    } else {
      // @ts-ignore
      history.push('/home')
    }
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
              value={locationText}
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
              value={clueText}
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
              value={hintText}
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
          <Link to={'/home'}>Home</Link>
        </button>
      </article>
    </>
  )
}
