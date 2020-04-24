import axios from 'axios'

export function getMessage() {
  return axios.get('http://localhost:3000/message').then(res => res.data)
}
