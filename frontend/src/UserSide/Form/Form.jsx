import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../token';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Features/user/userSlice';

const Form = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin) {
      if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone number must be 10 digits";
      if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
      if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const res = await api.post('api/user/login/', { email, password });
        const { access, refresh, is_superuser } = res.data;
        localStorage.setItem(ACCESS_TOKEN, access);
        localStorage.setItem(REFRESH_TOKEN, refresh);
        localStorage.setItem('admin', is_superuser);
        dispatch(login(res.data));
        alert('Login successful');
        navigate('/home');
      } else {
        const res = await fetch('http://127.0.0.1:8000/api/user/register/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, phone, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'you have already an account');
        alert('Registration successful');
        const userId = data?.id || data?.user_id;
        navigate(userId ? `/otp/${userId}` : '/otp');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-gradient-to-tr from-green-400 to-blue-400 text-white rounded-tr-[4rem] rounded-br-[4rem] shadow-xl">
        <h1 className="text-5xl font-bold mb-4">Success Edge</h1>
        <p className="text-xl text-center px-4">Welcome to the E-Learning Platform</p>
      </div>
  
      <div className="w-1/2 flex justify-center items-center p-10">
        <div className="w-full ">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 tracking-wide">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
  
          <form className="space-y-6" onSubmit={handleSubmit}>
  {!isLogin && (
    <>
      <div className="relative">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Full Name"
          className="peer w-full px-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-green-600 outline-none placeholder-transparent"
        />
        <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all 
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-gray-400 peer-focus:top-2 
          peer-focus:text-sm peer-focus:text-green-600">
          Full Name
        </label>
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
      </div>

      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="peer w-full px-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-green-600 outline-none placeholder-transparent"
        />
        <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all 
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-gray-400 peer-focus:top-2 
          peer-focus:text-sm peer-focus:text-green-600">
          Email
        </label>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="relative">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="Phone Number"
          className="peer w-full px-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-green-600 outline-none placeholder-transparent"
        />
        <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all 
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-gray-400 peer-focus:top-2 
          peer-focus:text-sm peer-focus:text-green-600">
          Phone Number
        </label>
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
    </>
  )}

  {isLogin && (
    <div className="relative">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
        className="peer w-full px-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-green-600 outline-none placeholder-transparent"
      />
      <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all 
        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-gray-400 peer-focus:top-2 
        peer-focus:text-sm peer-focus:text-green-600">
        Email
      </label>
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
    </div>
  )}

  <div className="relative">
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      placeholder="Password"
      className="peer w-full px-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-green-600 outline-none placeholder-transparent"
    />
    <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all 
      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
      peer-placeholder-shown:text-gray-400 peer-focus:top-2 
      peer-focus:text-sm peer-focus:text-green-600">
      Password
    </label>
    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
  </div>

  {!isLogin && (
    <div className="relative">
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        placeholder="Confirm Password"
        className="peer w-full px-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-green-600 outline-none placeholder-transparent"
      />
      <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all 
        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-gray-400 peer-focus:top-2 
        peer-focus:text-sm peer-focus:text-green-600">
        Confirm Password
      </label>
      {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
    </div>
  )}

  <button
    type="submit"
    className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition"
  >
    {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
  </button>
</form>


  
          <p className="text-center mt-6 text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={handleToggle}
              className="text-green-500 font-medium hover:underline transition"
            >
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
