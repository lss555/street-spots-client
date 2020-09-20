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

class YourSpots extends Component {
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
      this.props.user.id === spot.owner
        ? <div key={spot.id}>
          <Card>
            <CardBody>
              <CardTitle>{spot.country}</CardTitle>
              <CardSubtitle>{spot.city}</CardSubtitle>
            </CardBody>
            <img width="100%" src={placeholder} alt="Card image cap" />
            <CardBody>
              <CardText>{spot.description}</CardText>
              <CardLink href="#spots/:id/">Spot Link</CardLink>
              <CardLink href="#spots/update-spot">Spot Link</CardLink>
              <CardLink href="#spots/delete-spot">Spot Link</CardLink>
            </CardBody>
          </Card>
        </div> : null
    ))

    return (
      <div key={this.state.spots.id}>
        {spots}
      </div>
    )
  }
}

export default YourSpots