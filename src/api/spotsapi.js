import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexSpots = user => {
  return axios({
    url: apiUrl + '/spots/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const showSpot = user => {
  // const { match } = this.props
  console.log(this.props)
  return axios({
    url: apiUrl + `/spots/${this.props.match.params.id}`,
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
// export const createSpot = user => {
//   return axios({
//     url: `${apiUrl}/spots/`,
//     method: 'POST',
//     data: { spot: this.state.spot },
//     headers: {
//       'Authorization': `Token ${user.token}`
//     }
//   })
// }
