import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './UserSide/Form/Form';
import OTP from './UserSide/Otp/Otp';
import Home from './UserSide/Home/Home'
import SuperAdminLogin from './SuperAdminSide/SuperAdminLogin/SuperAdminLogin';
import SuperAdminHome from './SuperAdminSide/SuperAdminHome/SuperAdminHome';
import Subjects from './SuperAdminSide/Subjects/Subjects';
import Chapters from './SuperAdminSide/Chapters/Chapters';
import TopicPage from './SuperAdminSide/TopicPage/TopicPage'
import DetailsTopicPage from './SuperAdminSide/DetailsTopicPage/DetailsTopicPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/otp/:id" element={<OTP />} />
        <Route path="/home" element={<Home />} />
        <Route path="/superadminlogin" element={<SuperAdminLogin />} />
        <Route path="/superadminhome" element={<SuperAdminHome />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/TopicPage/:topicId" element={<TopicPage />} />
        <Route path="/DetailsTopicPage/:chapterId" element={<DetailsTopicPage />} />
        


      </Routes>
    </Router>
  );
};

export default App;
