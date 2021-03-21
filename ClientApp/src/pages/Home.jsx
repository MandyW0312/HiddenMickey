import React from 'react'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Hidden Mickeys</h1>
      </header>
      <main>
        <div className="container">
          <button className="browse">
            <Link to={'/view'}>Browse</Link>
          </button>
          <button className="add">
            <Link to={'/add'}>Add</Link>
          </button>
          <button className="scavenger">
            <Link to={'/hunt'}>Scavenger Hunt</Link>
          </button>
        </div>
      </main>
      <footer>
        <p>
          &copy; This Hidden Mickey App was created with &hearts; by Mandy (a
          smidge of Jason, some of Liz, and a whole lot of Gavin) 2021
        </p>
      </footer>
    </div>
  )
}
