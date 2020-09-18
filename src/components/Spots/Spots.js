import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import apiUrl from '../../apiConfig'
// import axios from 'axios'
import { indexSpots } from '../../api/spotsapi.js'

class Spots extends Component {
  constructor (props) {
    super(props)
    // setting initial state to be empty but would like it to be automatically loaded
    this.state = {
      spots: []
    }
  }

  componentDidMount () {
    indexSpots(this.props.user)

    // axios(`${apiUrl}/spots/`)
    // headers: {
    //   'Authorization': `Token ${user.token}`
    // }
      .then(res => this.setState({ spots: res.data.spots }))
      .catch(console.error)
  }

  render () {
    const spots = this.state.spots.map(spot => (
      <li key={spot._id}>
        <Link to={`/spots/${spot._id}`}>
          {spot.city}
        </Link>
      </li>
    ))

    return (
      <div>
        <h2>The Goods</h2>
        <ul>
          {spots}
        </ul>
      </div>
    )
  }
}

export default Spots
