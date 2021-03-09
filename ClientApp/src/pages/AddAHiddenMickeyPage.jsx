import React from 'react'

export function AddAHiddenMickeyPage() {
  return (
    <>
      <header>
        <h2>Add a Hidden Mickey</h2>
      </header>
      <form>
        <ul className="hidden-mickey">
          <li>
            <div class="dropdown">
              <span>Park Name</span>
              <div class="dropdown-content">
                <p>Magic Kingdom</p>
                <p>Epcot</p>
                <p>Hollywood Studios</p>
                <p>Animal Kingdom</p>
              </div>
            </div>
          </li>
          <li>
            <div class="dropdown">
              <span>Area of the Park</span>
              <div class="dropdown-content">
                <p>Main Street USA</p>
                <p>Fantasyland</p>
                <p>Tomorrowland</p>
                <p>Adventureland</p>
                <p>Frontierland</p>
                <p>Liberty Square</p>
              </div>
            </div>
          </li>

          <li>
            <label htmlFor="Location">Location: </label>
            <textarea
              rows="2"
              cols="30"
              name="Location"
              placeholder="Ride Name, Restaurant Name, Shop Name..."
            ></textarea>
          </li>
          <li>
            <label htmlFor="Clue">Clue: </label>
            <textarea
              rows="10"
              cols="30"
              name="Clue"
              placeholder="General area of where the Hidden Mickey is..."
            ></textarea>
          </li>
          <li>
            <label htmlFor="Hint">Hint: </label>
            <textarea
              rows="10"
              cols="30"
              name="Hint"
              placeholder="More specific to where the Hidden Mickey is..."
            ></textarea>
          </li>
        </ul>
      </form>
      <article className="buttons">
        <button>Submit</button>
      </article>
    </>
  )
}
