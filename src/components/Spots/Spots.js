import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import apiUrl from '../../apiConfig'
// import axios from 'axios'
import {
  Card, CardText, CardBody, CardLink,
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
      <div key={spot._id}>
        <Card>
          <CardBody>
            <CardTitle>{spot.country}</CardTitle>
            <CardSubtitle>{spot.city}</CardSubtitle>
          </CardBody>
          <img width="100%" src={placeholder} alt="Card image cap" />
          <CardBody>
            <CardText>{spot.description}</CardText>
            <CardLink href="#spots/:id">Spot Link</CardLink>
            <CardLink href="#">Another Link</CardLink>
          </CardBody>
        </Card>
      </div>
    ))

    return (
      <div>
        <h1>Spots</h1>
        {spots}
      </div>
    )
  }
}

export default Spots
