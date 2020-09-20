import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import apiUrl from '../../apiConfig'
// import axios from 'axios'
import { withRouter } from 'react-router'
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap'
import { indexSpots } from '../../api/spotsapi.js'
import placeholder from '../shared/placeholder.jpg'

class Spots extends Component {
  constructor (props) {
    super(props)
    this.state = {
      spots: []
    }
  }

  componentDidMount () {
    indexSpots(this.props.user)
      .then(res => this.setState({ spots: res.data.spots }))
      .catch(console.error)
  }

  render () {
    const spots = this.state.spots.map(spot => (
      <div key={spot.id}>
        <Card>
          <CardBody>
            <CardTitle>{spot.country}</CardTitle>
            <CardSubtitle>{spot.city}</CardSubtitle>
          </CardBody>
          <img width="100%" src={placeholder} alt="Card image cap" />
          <CardBody>
            <CardText>{spot.description}</CardText>
            <Link to={`/spots/${spot.id}/`}>Spot Link</Link>
          </CardBody>
        </Card>
      </div>
    ))
    // console.log(this.state.spots)
    return (
      <div key={this.state.spots.id}>
        <h1>Spots</h1>
        {spots}
      </div>
    )
  }
}

export default withRouter(Spots)
