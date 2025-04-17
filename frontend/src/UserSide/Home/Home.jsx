import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/Features/user/userSlice'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate('/Form')
  }
  return (
    <div>
      This is just home page
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home