import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
// import Form from 'react-bootstrap/Form'
// import { createSpot } from '../../api/spotsapi.js'
import './create-form.css'

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
      createdSpotId: ''
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
      .then(res => this.setState({ createdSpotId: res.data.spot.id }))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { createdSpotId, spot } = this.state

    if (createdSpotId) {
      return <Redirect to='/spots/' />
    }

    return (
      <form onSubmit={handleSubmit}>
        <label>Country</label>
        <input
          className='create-form'
          placeholder="North Korea"
          value={spot.country}
          name="country"
          onChange={handleChange}
        />

        <label>State</label>
        <input
          className='create-form'
          placeholder="Florida"
          value={spot.state}
          name="state"
          onChange={handleChange}
        />

        <label>City</label>
        <input
          className='create-form'
          placeholder="Salt Lake City"
          value={spot.city}
          name="city"
          onChange={handleChange}
        />

        <label>address</label>
        <input
          className='create-form'
          placeholder="86 Bedford Street"
          value={spot.address}
          name="address"
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          cols="10"
          rows="10"
          className='create-form'
          placeholder="bit of a cheese wedge eh?"
          value={spot.description}
          name="description"
          onChange={handleChange}
        />

        <label>Choose a season:</label>
        <select title="season"
          className='create-form' value={spot.season} onChange={handleChange}
          name="season"
          required>
          <option value="Winter">Winter</option>
          <option value="Summer">Summer</option>
          <option value="Either">Either</option>
        </select>
        <button bg='dark' className='submit-btn' type="submit">Submit</button>
      </form>
    )
  }
}

export default withRouter(CreateSpot)
