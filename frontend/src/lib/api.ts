
import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
    timeout: 120000,
    headers: {
        'Content-type': 'application/json',
    },
})

const getTokenByPathname = () => {
    if (typeof window !== 'undefined') {
        const pathname = window.location.pathname

        if (pathname.startsWith('/admin')) {
            return localStorage.getItem('tokenAdmin') || null
        }
        if (pathname.startsWith('/cpmi')) {
            return localStorage.getItem('tokenCpmi') || null
        }
        if (pathname.startsWith('/pengajar')) {
            return localStorage.getItem('tokenPengajar') || null
        }
    }
    return null
}

api.interceptors.request.use(
    config => {
        const tokens = getTokenByPathname()
        if (tokens) {
            config.headers['Authorization'] = `Bearer ${tokens}`
        }
        return config
    },
    error => Promise.reject(error)
)

export default api