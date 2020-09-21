import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
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
      spots: [],
      deleted: false
    }
  }

  componentDidMount () {
    indexSpots(this.props.user)
      .then(res => this.setState({ spots: res.data.spots }))
      .catch(console.error)
  }

  destroySpot = (user) => {
    axios({
      url: apiUrl + '/spots/',
      mathod: 'DELETE',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { deleted } = this.state

    if (deleted) {
      return <Redirect to='/'/>
    }

    const spots = this.state.spots.map(spot => (
      this.props.user.id === spot.owner
        ? <div key={spot.id}>
          <Card className="text-white your-spots-card" body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
            <CardBody>
              <CardTitle>{spot.country}</CardTitle>
              <CardSubtitle>{spot.city}</CardSubtitle>
            </CardBody>
            <img width="100%" src={placeholder} alt="Card image cap" />
            <CardBody>
              <CardText>{spot.description}</CardText>
              <CardLink href="#spots/:id/">Spot Link</CardLink>
              <CardLink href="#spots/update-spot">Edit</CardLink>
              <button onClick={this.destroySpot}>Delete</button>
            </CardBody>
          </Card>
        </div> : null
    ))

    return (
      <div key={this.state.spots.id}>
        <h1 className="spots-header">Your Spots</h1>
        {spots}
      </div>
    )
  }
}

export default YourSpots
