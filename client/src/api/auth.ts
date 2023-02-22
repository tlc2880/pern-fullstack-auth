import axios from 'axios'
import loginType from '../authTypes'

axios.defaults.withCredentials = true

export async function onRegistration(registrationData: loginType) {
    return await axios.post(
        'http://localhost:5000/api/register',
        registrationData
    )
}

export async function onLogin(loginData: loginType) {
    return await axios.post(
        'http://localhost:5000/api/login',
        loginData
    )
}

export async function onLogout() {
    return await axios.get(
        'http://localhost:5000/api/logout'
    )
}

export async function fetchProtectedInfo() {
    return await axios.get(
        'http://localhost:5000/api/protected'
    )
}