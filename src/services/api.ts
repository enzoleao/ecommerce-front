import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()
const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${cookies['auth-token']}`,
    'Content-Type': 'application/json',
  },
})

export default api
