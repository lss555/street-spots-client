import React, { Component } from 'react'
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap'
import placeholder from '../shared/placeholder.jpg'
import { Link, Redirect, withRouter } from 'react-router-dom'
// import { showSpot } from '../../api/spotsapi.js'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class Spot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      spot: null,
      deleted: false
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

  deleteSpot = () => {
    axios({
      url: `${apiUrl}/spots/${this.props.match.params.id}/`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { spot, deleted } = this.state

    if (deleted) {
      return <Redirect to={{
        pathname: '/spots',
        state: { message: 'Deleted spot successfully' }
      }} />
    }

    if (!spot) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }

    return (
      <div key={spot._id}>
        <Card className="text-white text-center spot-card" body inverse style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}>
          <CardBody>
            <CardTitle>{spot.country}</CardTitle>
            <CardSubtitle>{spot.city}</CardSubtitle>
          </CardBody>
          <img width="100%" src={placeholder} alt="Card image cap" />
          <CardBody>
            <CardText>{spot.description}</CardText>
            <Link to="/spots" className="back-btn">Back to Spots</Link>
            { this.props.user.id === spot.owner
              ? <div>
                <Link to={`/spots/${spot.id}/edit`}>
                  <Button className="edit-btn">Edit Spot</Button>
                </Link>
                <Button className="delete-btn" onClick={this.deleteSpot}>Delete</Button>
              </div>
              : null }
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default withRouter(Spot)
