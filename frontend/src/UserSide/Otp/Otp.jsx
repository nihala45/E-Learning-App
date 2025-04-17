import React from 'react';

const Otp = () => {
  return (
    <div className="flex min-h-screen">
      
      <div className="w-1/2 bg-green-300 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-5xl font-bold mb-4">Success Edge</h1>
        <p className="text-xl text-center px-4">Welcome to the E-Learning Platform</p>
      </div>

      <div className="w-1/2 flex justify-center items-center p-10 bg-gray-100">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Verify OTP</h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Enter the 6-digit code sent to your phone
          </p>

          <form className="space-y-6">
            <div className="flex justify-between space-x-2">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-green-300 text-white py-2.5 rounded-lg hover:bg-green-500 transition duration-300 font-medium"
            >
              Verify
            </button>

            <p className="text-center text-sm text-gray-600">
              Didn’t receive the code?{' '}
              <button type="button" className="text-green-500 hover:underline font-medium">
                Resend OTP
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
