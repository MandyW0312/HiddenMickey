import React from 'react'
import './custom.scss'

export function App() {
  return (
    <div>
      <header>
        <ul>
          <li>Welcome, Francie!</li>
          <li>Login</li>
          <li>SignUp</li>
        </ul>
        <h1>Hidden Mickeys</h1>
      </header>
      <main>
        <button>Browse All</button>
        <button>Add</button>
        <button>Scavenger Hunt</button>
      </main>
      <footer>
        <p>
          &copy; This Hidden Mickey App was created with &hearts; by Mandy Wade
          2021
        </p>
      </footer>
    </div>
  )
}
