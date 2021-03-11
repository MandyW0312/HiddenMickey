import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

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

  useEffect(
    function () {
      async function fetchMickey() {
        const response = await fetch(
          `/api/AreaOfTheParks/${mickey.areaOfTheParkId}`
        )
        const json = await response.json()
        setArea(json)
      }
      fetchMickey()
    },
    [mickey.areaOfTheParkId]
  )

  useEffect(
    function () {
      async function fetchMickey() {
        const response = await fetch(`/api/Parks/${area.parkId}`)
        const json = await response.json()
        setPark(json)
      }
      fetchMickey()
    },
    [area.parkId]
  )

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
        <button className="specific-buttons">Delete</button>
        <button className="specific-buttons">
          <Link to={'/home'}>Home</Link>
        </button>
        <button className="specific-buttons">
          <Link to={'/update'}>Update</Link>
        </button>
      </article>
    </>
  )
}
