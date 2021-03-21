import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'

export function HiddenMickey() {
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

  const params = useParams()
  const history = useHistory()

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

  async function handleDelete(event) {
    event.preventDefault()

    // @ts-ignore
    const response = await fetch(`/api/HiddenMickeys/${params.id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })

    if (response.status === 200 || response.status === 204) {
      history.push('/home')
    }
  }

  return (
    <>
      <header className="specific-header">
        <h2>Hidden Mickey #{mickey.id}</h2>
      </header>
      <ul className="specific-mickey">
        <li>Park: {park.name}</li>
        <li>Area: {area.name}</li>
        <li>Location: {mickey.location}</li>
        <li>Clue: {mickey.clue}</li>
        <li>Hint: {mickey.hint}</li>
      </ul>
      <article className="buttons">
        <button className="specific-buttons" onClick={handleDelete}>
          Delete
        </button>
        <button className="specific-buttons">
          <Link to={'/'}>Home</Link>
        </button>
        <button className="specific-buttons">
          <Link to={`/update/${mickey.id}`}>Update</Link>
        </button>
      </article>
    </>
  )
}
