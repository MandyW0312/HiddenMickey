import React from 'react'

export function Home() {
  return (
    <>
      <header>
        <h1>Hidden Mickeys</h1>
      </header>
      <main>
        <section>
          <button className="browse">Browse All</button>
          <button className="add">Add</button>
        </section>
        <section className="second">
          <button className="scavenger">Scavenger Hunt</button>
        </section>
      </main>
      <footer>
        <p>
          &copy; This Hidden Mickey App was created with &hearts; by Mandy Wade
          2021
        </p>
      </footer>
    </>
  )
}
