import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import apiUrl from '../../apiConfig'
// import axios from 'axios'
import { withRouter } from 'react-router'
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col
} from 'reactstrap'
import { indexSpots } from '../../api/spotsapi.js'
import placeholder from '../shared/placeholder.jpg'
import './Spots.scss'
// import Home from '../Home/Home.js'

class Spots extends Component {
  constructor (props) {
    super(props)
    this.state = {
      spots: []
    }
  }

  componentDidMount () {
    indexSpots(this.props.user)
      .then(res => this.setState({ spots: res.data.spots.reverse() }))
      .catch(console.error)
  }

  render () {
    const spots = this.state.spots.map(spot => (
      <Col sm='4' key={spot.id}>
        <div className='card-div'>
          <Card className="text-white spots-card" body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
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
      </Col>
    ))

    return (
      <div key={this.state.spots.id}>
        <h1 className='spots-header'>Spots</h1>
        <Row>
          {spots}
        </Row>
      </div>
    )
  }
}

export default withRouter(Spots)
