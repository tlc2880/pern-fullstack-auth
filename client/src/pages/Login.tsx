import React, { useState } from 'react';
import Layout from '../components/Layout'
import { onLogin } from '../api/auth'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../redux/slices/authSlice'

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await onLogin(values)
      dispatch(authenticateUser())
      localStorage.setItem('isAuth', 'true')
    } catch (error: any) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    }
  }

  return (
    <Layout>
      <form onSubmit={(e) => handleOnSubmit(e)} className='container mt-3'>
        <h1>Login</h1>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={values.email}
            placeholder='test@gmail.com'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            className='form-control'
            id='password'
            name='password'
            placeholder='passwod'
            required
          />
        </div>

        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </Layout>
  )
}
export default Login;