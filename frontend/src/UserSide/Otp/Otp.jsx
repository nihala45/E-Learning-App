import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../../api';
import { login } from '../../Redux/Features/user/userSlice';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../token';

const Otp = () => {
  const { id } = useParams(); 
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 

  const handleChange = (e, index) => {
    const value = e.target.value;
  
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
  
  
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const emailOtp = otp.join('');
    console.log("Submitting OTP:", emailOtp);

    if (emailOtp.length === 6) {
      try {
        const response = await api.post(`api/user/verify_otp/${id}/`, {
          email_otp: emailOtp,
        });

        if (response.status === 200) {
          const { access, refresh, is_superuser } = response.data;

          localStorage.setItem(ACCESS_TOKEN, access);
          localStorage.setItem(REFRESH_TOKEN, refresh);
          localStorage.setItem('admin', is_superuser); 

          dispatch(login(response.data)); 
          navigate('/home');
        }
      } catch (error) {
        console.error('OTP verification failed:', error);
        alert('Invalid OTP. Please try again.');
      }
    } else {
      alert('Please enter a 6-digit OTP.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-gradient-to-tr from-green-400 to-blue-400 text-white rounded-tr-[4rem] rounded-br-[4rem] shadow-xl">
        <h1 className="text-5xl font-bold mb-4">Success Edge</h1>
        <p className="text-xl text-center px-4">Welcome to the E-Learning Platform</p>
      </div>

      <div className="w-1/2 flex justify-center items-center p-10 bg-gray-100">
        <div className="bg-white rounded-2xl   w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Verify OTP</h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Enter the 6-digit code sent to your phone
          </p>

          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between space-x-2">
              {otp.map((value, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e, i)}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              ))}
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-500 transition duration-300 font-medium"
            >
              Verify
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
