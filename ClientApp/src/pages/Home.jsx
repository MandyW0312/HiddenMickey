import React from 'react'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div>
      <header className="home-header">
        <h1>Hidden Mickeys</h1>
      </header>
      <main>
        <div className="container">
          <button className="browse">
            <Link to={'/view'}>Browse All</Link>
          </button>
          <button className="add">
            <Link to={'/add'}>Add</Link>
          </button>
          <button className="scavenger">
            <Link to={'/hunt'}>Scavenger Hunt</Link>
          </button>
        </div>
        <footer>
          <p>
            &copy; This Hidden Mickey App was created with &hearts; by Mandy
            Wade 2021
          </p>
        </footer>
      </main>
    </div>
  )
}
