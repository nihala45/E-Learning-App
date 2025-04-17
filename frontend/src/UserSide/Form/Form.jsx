import React, { useState } from 'react';

const Form = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
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

          <form className="space-y-5">
            {!isLogin && (
              <>
                <div>
                  <label className="block mb-1 text-gray-700">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700">Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block mb-1 text-gray-700">Phone Number</label>
              <input
                name="phone"
                type="tel"
                placeholder="9876543210"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                placeholder="********"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block mb-1 text-gray-700">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="********"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-300 text-white py-2.5 rounded-lg hover:bg-green-500 transition duration-300 font-medium"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={handleToggle}
              className="text-green-500 hover:underline font-medium"
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
