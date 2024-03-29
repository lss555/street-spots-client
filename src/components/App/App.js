import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Home from '../Home/Home'
import Spots from '../Spots/Spots'
import Spot from '../Spot/Spot'
import CreateSpot from '../CreateSpot/CreateSpot'
import YourSpots from '../YourSpots/YourSpots'
import EditSpot from '../EditSpot/EditSpot'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          <Route user={user} exact path='' render={() => (
            <Home msgAlert={this.msgAlert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/spots' render={() => (
            <Spots msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/spots/:id' render={({ match }) => (
            <Spot msgAlert={this.msgAlert} user={user}
              clearUser={this.clearUser}
              match={match} />
          )} />

          <AuthenticatedRoute user={user} path='/create-spot' render={() => (
            <CreateSpot msgAlert={this.msgAlert} clearUser={this.clearUser} user={user}
              history={history} />
          )} />

          <AuthenticatedRoute user={user} path='/your-spots' render={() => (
            <YourSpots msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/spots/:id/edit' render={() => (
            <EditSpot msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />

        </main>
      </Fragment>
    )
  }
}

export default withRouter(App)
