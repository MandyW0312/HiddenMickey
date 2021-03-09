import React from 'react'

export function ScavengerHunt() {
  return (
    <>
      <header>
        <h2>Scavenger Hunt</h2>
      </header>
      <article className="shDropdown">
        <div className="dropdown">
          <span>Park Name</span>
          <div className="dropdown-content">
            <p>Magic Kingdom</p>
            <p>Epcot</p>
            <p>Hollywood Studios</p>
            <p>Animal Kingdom</p>
          </div>
        </div>
      </article>
      <p className="disclaimer">
        Please Note: We recommend that if a Hidden Mickey is during a ride to
        click on the clue for a more specific hint before riding.
      </p>
      <ul className="scavenger-hunt">
        <li>
          <h4>Location: Mickey’s PhilharMagic</h4>
          <p>
            Clue: In the attraction’s 3-D film itself, there is a series of
            Hidden Mickeys. (There are 3 possible options)
          </p>
        </li>
        <li>
          <h4>Location: The Barnstormer</h4>
          <p>
            Clue: Prior to entering the queue area, take a peek at the ticket
            booth advertising the Great Goofini.
          </p>
        </li>
        <li>
          <h4>Location: Be Our Guest Restaurant</h4>
          <p>
            Clue: A classic Hidden Mickey can be found on the short rock wall to
            the left of the restaurant’s check-in desk.
          </p>
        </li>
      </ul>
      <article className="buttons">
        <button>Home</button>
      </article>
    </>
  )
}
