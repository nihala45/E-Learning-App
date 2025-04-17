import React from 'react'
import Form from './UserSide/Form/Form'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import OTP from './UserSide/Otp/Otp'
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/Form' element={<Form/>}/>
          <Route path='/OTP' element={<OTP/>}/>

        </Routes>
      </Router>
    </div>
  )
}

export default App
