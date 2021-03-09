import React from 'react'
import { AddAHiddenMickeyPage } from './pages/AddAHiddenMickeyPage'
import './custom.scss'
import { HiddenMickey } from './pages/HiddenMickey'
import { HiddenMickeys } from './pages/HiddenMickeys'
import { Home } from './pages/Home'
import { ScavengerHunt } from './pages/ScavengerHunt'
import { UpdateHiddenMickeyPage } from './pages/UpdateHiddenMickeyPage'

export function App() {
  return (
    // <>
    //   <header>
    //     <h1></h1>
    //   </header>
    //   <section>
    //     <Switch>
    //       <Route exact path="/"></Route>
    //       <Route exact path="/"></Route>
    //       <Route exact path="*">
    //         Sorry, this page is Not Found!
    //       </Route>
    //     </Switch>
    //   </section>
    //   <footer>
    //     <p>
    //       &copy; This Hidden Mickey App was created with &hearts; by Mandy Wade
    //       2021
    //     </p>
    //   </footer>
    // </>
    <HiddenMickeys />
  )
}
