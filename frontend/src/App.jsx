import React from 'react'
import Form from './UserSide/Form/Form'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/Form' element={<Form/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
