import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export function ScavengerHunt() {
  const [mickeys, setMickeys] = useState([])

  const params = useParams()
  // @ts-ignore
  const scavengerHuntId = params.id

  useEffect(
    function () {
      async function fetchMickey() {
        // @ts-ignore
        const response = await fetch(`/api/ScavengerHunts/${scavengerHuntId}`)
        const json = await response.json()

        setMickeys(json.scavengerHuntMickeys)
      }
      fetchMickey()
    },
    // @ts-ignore
    [scavengerHuntId]
  )

  return (
    <>
      <header className="hunt-header">
        <h2>Scavenger Hunt # {scavengerHuntId} </h2>
      </header>
      <p className="disclaimer">
        Please Note: We recommend that if a Hidden Mickey is during a ride to
        read the more specific hint before riding.
      </p>
      <ul className="scavenger-hunt">
        {mickeys.map(function (mickey) {
          return (
            <li key={mickey.hiddenMickey.id}>
              <h4>
                <input type="checkbox"></input>Location:{' '}
                {mickey.hiddenMickey.location}
              </h4>
              <p>
                <span>Clue:</span> {mickey.hiddenMickey.clue}
              </p>
              <p className="hint">
                <span>Hint:</span> {mickey.hiddenMickey.hint}
              </p>
            </li>
          )
        })}
      </ul>
      <article className="buttons">
        <button className="hunt-page-home">
          <Link to={'/'}>Home</Link>
        </button>
      </article>
    </>
  )
}
