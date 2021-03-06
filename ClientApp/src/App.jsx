import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AddAHiddenMickeyPage } from './pages/AddAHiddenMickeyPage'
import './custom.scss'
import { HiddenMickey } from './pages/HiddenMickey'
import { HiddenMickeys } from './pages/HiddenMickeys'
import { Home } from './pages/Home'
import { ScavengerHunt } from './pages/ScavengerHunt'
import { UpdateHiddenMickeyPage } from './pages/UpdateHiddenMickeyPage'
import { NewScavengerHunt } from './pages/NewScavengerHunt'

export function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/view">
          <HiddenMickeys />
        </Route>
        <Route exact path="/HiddenMickeys/:id">
          <HiddenMickey />
        </Route>
        <Route exact path="/update/:id">
          <UpdateHiddenMickeyPage />
        </Route>
        <Route exact path="/add">
          <AddAHiddenMickeyPage />
        </Route>
        <Route exact path="/hunt">
          <NewScavengerHunt />
        </Route>
        <Route exact path="/hunt/:id">
          <ScavengerHunt />
        </Route>
        <Route exact path="*">
          Sorry, this page is Not Found!
        </Route>
      </Switch>
    </>
  )
}
