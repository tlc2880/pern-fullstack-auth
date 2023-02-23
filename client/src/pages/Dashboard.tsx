import React, { useState, useEffect } from 'react';
import { fetchProtectedInfo, onLogout } from '../api/auth'
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'
import { unauthenticateUser } from '../redux/slices/authSlice'

function Dashboard() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, protectedDataSet] = useState(null);


  const logout = async () => {
    try {
      await onLogout()
      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error: any) {
        console.log(error.response)
    }
  }

  const protectedInfo = async () => {
    try {
      // eslint-disable-next-line
      const { data } = await fetchProtectedInfo()
      protectedDataSet(data.info)
      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedInfo()
  }, [])

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <h1>Dashboard</h1>
        <h2>{protectedData}</h2>
        <button onClick={() => logout()} className="btn btn-primary">
          Logout
        </button>
      </Layout>
    </div>
  )
}

export default Dashboard;