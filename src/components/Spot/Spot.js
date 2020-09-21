import React, { Component } from 'react'
import {
  Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Spinner
} from 'reactstrap'
import placeholder from '../shared/placeholder.jpg'
import { Link, withRouter } from 'react-router-dom'
// import { showSpot } from '../../api/spotsapi.js'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class Spot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      spot: null
    }
  }

  componentDidMount () {
    const showSpot = user => {
      return axios({
        url: apiUrl + `/spots/${this.props.match.params.id}`,
        method: 'GET',
        headers: {
          'Authorization': `Token ${user.token}`
        }
      })
    }

    showSpot(this.props.user)
      .then(res => this.setState({ spot: res.data.spot }))
      .catch(console.error)
  }

  render () {
    const { spot } = this.state
    if (!spot) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    return (
      <div key={spot._id}>
        <Card>
          <CardBody>
            <CardTitle>{spot.country}</CardTitle>
            <CardSubtitle>{spot.city}</CardSubtitle>
          </CardBody>
          <img width="100%" src={placeholder} alt="Card image cap" />
          <CardBody>
            <CardText>{spot.description}</CardText>
            <Link to="/spots">Back to Spots</Link>
            <CardLink href="#">Another Link</CardLink>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default withRouter(Spot)
