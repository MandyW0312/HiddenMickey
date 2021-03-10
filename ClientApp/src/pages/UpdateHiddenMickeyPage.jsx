import React, { useEffect, useState, useParams } from 'react'
import { Link } from 'react-router-dom'

export function UpdateHiddenMickeyPage() {
  const [updateMickey, setUpdateMickey] = useState({
    id: undefined,
  })

  // const params = useParams()

  // useEffect(
  //   function () {
  //     async function fetchMickey() {
  //       const response = await fetch(`/api/HiddenMickeys/${params.id}`)
  //       const json = await response.json()
  //       setUpdateMickey(json)
  //     }
  //     fetchMickey()
  //   },
  //   [params.id]
  // )

  return (
    <>
      <header>
        <h2>Hidden Mickey #{updateMickey.id}</h2>
      </header>
      <p className="disclaimer">Thank you for updating our error!</p>
      <ul className="hidden-mickey">
        <li>Park: Magic Kingdom</li>
        <li>Area: Main Street USA</li>
        <form>
          <li>
            <label htmlFor="Location">Location: </label>
            <input
              type="text"
              placeholder="Railroad Station"
              value=""
              name="Location"
              onChange=""
            ></input>
          </li>
          <li>
            <label htmlFor="Clue">Clue: </label>
            <textarea rows="10" cols="30" name="Clue">
              {updateMickey.clue}
            </textarea>
          </li>
          <li>
            <label htmlFor="Hint">Hint: </label>
            <textarea rows="10" cols="30" name="Hint">
              {updateMickey.hint}
            </textarea>
          </li>
        </form>
      </ul>
      <article className="buttons">
        <button>Submit</button>
        <button>
          <Link to={'/home'}>Home</Link>
        </button>
      </article>
    </>
  )
}
