import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export function UpdateHiddenMickeyPage() {
  const params = useParams()
  const [updateMickey, setUpdateMickey] = useState({
    id: undefined,
    location: '',
    clue: '',
    hint: '',
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

  useEffect(
    function () {
      async function fetchMickey() {
        const response = await fetch(`/api/HiddenMickeys/${params.id}`)
        const json = await response.json()
        setUpdateMickey(json)
      }
      fetchMickey()
    },
    [params.id]
  )

  useEffect(
    function () {
      async function fetchArea() {
        const response = await fetch(
          `/api/AreaOfTheParks/${updateMickey.areaOfTheParkId}`
        )
        const json = await response.json()
        setArea(json)
      }
      fetchArea()
    },
    [updateMickey.areaOfTheParkId]
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

  console.log(updateMickey.location)
  console.log(updateMickey.clue)
  console.log(updateMickey.hint)

  return (
    <>
      <header className="update-header">
        <h2>Hidden Mickey #{updateMickey.id}</h2>
      </header>
      <p className="update-message">Thank you for updating our error!</p>
      <ul className="update-mickey">
        <li>Park: {park.name}</li>
        <li>Area: {area.name}</li>
        <form>
          <li>
            <label htmlFor="Location">Location: </label>
            <textarea
              rows="5"
              cols="30"
              name="Location"
              placeholder={updateMickey.location}
            >
              {updateMickey.location}
            </textarea>
          </li>
          <li>
            <label htmlFor="Clue">Clue: </label>
            <textarea
              rows="10"
              cols="30"
              name="Clue"
              placeholder={updateMickey.clue}
            >
              {updateMickey.clue}
            </textarea>
          </li>
          <li>
            <label htmlFor="Hint">Hint: </label>
            <textarea
              rows="10"
              cols="30"
              name="Hint"
              placeholder={updateMickey.hint}
            >
              {updateMickey.hint}
            </textarea>
          </li>
        </form>
      </ul>
      <article className="buttons">
        <button className="update-buttons">Submit</button>
        <button className="update-buttons">
          <Link to={'/home'}>Home</Link>
        </button>
      </article>
    </>
  )
}
