import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './UserSide/Form/Form';
import OTP from './UserSide/Otp/Otp';
import Home from './UserSide/Home/Home'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/otp/:id" element={<OTP />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </Router>
  );
};

export default App;
