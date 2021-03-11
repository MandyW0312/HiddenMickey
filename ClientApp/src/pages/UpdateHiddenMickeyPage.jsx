import React, { useEffect, useState, useParams } from 'react'
import { Link } from 'react-router-dom'

export function UpdateHiddenMickeyPage() {
  // const [updateMickey, setUpdateMickey] = useState({
  //   id: undefined,
  // })

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
      <header className="update-header">
        <h2>Hidden Mickey #ID</h2>
        {/* {updateMickey.id} */}
      </header>
      <p className="update-message">Thank you for updating our error!</p>
      <ul className="update-mickey">
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
              {/* {updateMickey.clue} */}
            </textarea>
          </li>
          <li>
            <label htmlFor="Hint">Hint: </label>
            <textarea rows="10" cols="30" name="Hint">
              {/* {updateMickey.hint} */}
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
