import React, { Component } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class EditSpot extends Component {
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
      updated: false
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
      url: `${apiUrl}/spots/${this.props.match.params.id}/`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      },
      data: { spot: this.state.spot }
    })
      .then(res => this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    const { spot, updated } = this.state
    const { handleChange, handleSubmit } = this
    if (updated) {
      return <Redirect to={`/spots/${this.props.match.params.id}`} />
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
        <Link to={`/spots/${spot.id}/edit`}>
          <button>Cancel</button>
        </Link>
      </form>
    )
  }
}

export default withRouter(EditSpot)
