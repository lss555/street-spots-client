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
