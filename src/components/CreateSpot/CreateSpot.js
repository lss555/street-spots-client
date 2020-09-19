import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
// import Form from 'react-bootstrap/Form'
// import { createSpot } from '../../api/spotsapi.js'

class CreateSpot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      spot: {
        country: '',
        state: '',
        city: '',
        address: '',
        description: '',
        season: ''
      },
      createdSpotId: null
    }
  }

  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedSpot = Object.assign({}, prevState.spot, updatedField)
      return { spot: editedSpot }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/spots/`,
      method: 'POST',
      data: { spot: this.state.spot },
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ createdSpotId: res.data.spot._id }))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { createdSpotId, spot } = this.state

    if (createdSpotId) {
      return <Redirect to={'/spots/'} />
    }

    return (
      <form onSubmit={handleSubmit}>
        <label>Country</label>
        <input
          placeholder="North Korea"
          value={spot.country}
          name="country"
          onChange={handleChange}
        />

        <label>State</label>
        <input
          placeholder="Florida"
          value={spot.state}
          name="state"
          onChange={handleChange}
        />

        <label>City</label>
        <input
          placeholder="Salt Lake City"
          value={spot.city}
          name="city"
          onChange={handleChange}
        />

        <label>address</label>
        <input
          placeholder="86 Bedford Street"
          value={spot.address}
          name="address"
          onChange={handleChange}
        />

        <label>Description</label>
        <input
          placeholder="bit of a cheese wedge"
          value={spot.description}
          name="description"
          onChange={handleChange}
        />

        <label>Choose a season:</label>
        <select title="season" value={spot.season} onChange={handleChange}
          name="season"
          required>
          <option value="Winter">Winter</option>
          <option value="Summer">Summer</option>
          <option value="Either">Either</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default CreateSpot
