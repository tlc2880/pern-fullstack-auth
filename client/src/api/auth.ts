import axios from 'axios'
import loginType from '../auth.Type'

axios.defaults.withCredentials = true

export async function onRegistration(registrationData: loginType) {
    return await axios.post(
        'http://localhost:5000/register',
        registrationData
    )
}

export async function onLogin(loginData: loginType) {
    return await axios.post(
        'http://localhost:5000/login',
        loginData
    )
}

export async function onLogout() {
    return await axios.get(
        'http://localhost:5000/logout'
    )
}

export async function fetchProtectedInfo() {
    return await axios.get(
        'http://localhost:5000/protected'
    )
}