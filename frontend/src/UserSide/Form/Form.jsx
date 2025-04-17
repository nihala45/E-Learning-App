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
    if (!email) newErrors.email = "Email is required";
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
        if (!res.ok) throw new Error(data.message || 'Registration failed');
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
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-green-300 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold mb-4">Success Edge</h1>
        <p className="text-xl text-center px-4">Welcome to the E-Learning Platform</p>
      </div>

      <div className="w-1/2 flex justify-center items-center p-10 bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {isLogin ? 'Login' : 'Register'}
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div>
                  <label className="block mb-1 text-gray-700">Full Name</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Enter full name"
                    required
                    className="w-full px-4 py-2 border rounded-lg shadow-md"
                  />
                  {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>

                <div>
                  <label className="block mb-1 text-gray-700">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email"
                    required
                    className="w-full px-4 py-2 border rounded-lg shadow-md"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <label className="block mb-1 text-gray-700">Phone Number</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder="Enter phone number"
                    required
                    className="w-full px-4 py-2 border rounded-lg shadow-md"
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
              </>
            )}

            {isLogin && (
              <div>
                <label className="block mb-1 text-gray-700">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                  required
                  className="w-full px-4 py-2 border rounded-lg shadow-md"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            )}

            <div>
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
                required
                className="w-full px-4 py-2 border rounded-lg shadow-md"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div>
                <label className="block mb-1 text-gray-700">Confirm Password</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm your password"
                  required
                  className="w-full px-4 py-2 border rounded-lg shadow-md"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-400 text-white py-2.5 rounded-lg hover:bg-green-500"
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={handleToggle}
              className="text-green-500 hover:underline"
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
