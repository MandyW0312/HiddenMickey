import React from 'react'

export function UpdateHiddenMickeyPage() {
  return (
    <>
      <header>
        <h2>Hidden Mickey #ID</h2>
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
              The train station above the Park’s entry area has a Hidden Mickey
              situated along the top portion of the train station itself.
            </textarea>
          </li>
          <li>
            <label htmlFor="Hint">Hint: </label>
            <textarea rows="10" cols="30" name="Hint">
              The wrought iron gate work has a repeating Hidden Mickey head
              design running along the roof.
            </textarea>
          </li>
        </form>
      </ul>
      <article className="buttons">
        <button>Submit</button>
      </article>
    </>
  )
}
