import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const api = axios.create({
  baseURL: baseUrl,
})

export default api
