import React, { useState } from 'react';

const Form = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (isLogin) {
      const phone = form.phone.value;
      const password = form.password.value;

      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.phone === phone && storedUser.password === password) {
        alert('Login successful!');
      } else {
        alert('Invalid phone or password.');
      }
    } else {
      const name = form.name.value;
      const email = form.email.value;
      const phone = form.phone.value;
      const password = form.password.value;
      const confirmPassword = form.confirmPassword.value;

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const newUser = { name, email, phone, password };
      localStorage.setItem('user', JSON.stringify(newUser));
      alert('Registered successfully!');
      setIsLogin(true);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold mb-4">Success Edge</h1>
        <p className="text-xl text-center px-4">Welcome to the E-Learning Platform</p>
      </div>

      {/* Right Side */}
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
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="form-input"
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
                className="form-input"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                placeholder="********"
                required
                className="form-input"
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
                  className="form-input"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={handleToggle}
              className="text-blue-600 hover:underline font-medium"
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
