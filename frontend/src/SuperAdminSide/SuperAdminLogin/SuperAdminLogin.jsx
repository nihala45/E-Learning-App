import React, { useState } from 'react';
import api from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../token';
import { login } from '../../Redux/Features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SuperAdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    const data = { email, password };

    try {
      const res = await api.post('/superadmin_app/superadmin/login/', data);

      
      if (res.data.access && res.data.refresh) {
        const { access, refresh, is_superuser } = res.data;
        
        
        localStorage.setItem(ACCESS_TOKEN, access);
        localStorage.setItem(REFRESH_TOKEN, refresh);
        localStorage.setItem('admin', JSON.stringify({ is_superuser }));

        dispatch(login(res.data));

        alert('Super Admin Login successful');
        navigate('/SuperAdminHome');
      } else {
        throw new Error('Missing tokens in response');
      }
    } catch (error) {
      console.log('Login error:', error);
      setError('Invalid username or password, please try again'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-100 to-red-100">
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-gradient-to-tr from-green-400 to-red-400 text-white rounded-tr-[4rem] rounded-br-[4rem] shadow-xl">
        <h1 className="text-5xl font-bold mb-4">Success Edge</h1>
        <p className="text-xl text-center px-4">Welcome to the E-Learning Platform</p>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <div className="p-8 w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Super Admin Login</h2>
          <form onSubmit={handleSubmit}>
            
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-400 hover:bg-red-700'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
