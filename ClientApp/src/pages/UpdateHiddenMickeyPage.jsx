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
        <li>Park: Magic Kingdom</li>
        <li>Area: Main Street USA</li>
        <form>
          <li>
            <label htmlFor="Location">Location: </label>
            <textarea rows="5" cols="30" name="Location"></textarea>
          </li>
          <li>
            <label htmlFor="Clue">Clue: </label>
            <textarea rows="10" cols="30" name="Clue"></textarea>
          </li>
          <li>
            <label htmlFor="Hint">Hint: </label>
            <textarea rows="10" cols="30" name="Hint"></textarea>
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
