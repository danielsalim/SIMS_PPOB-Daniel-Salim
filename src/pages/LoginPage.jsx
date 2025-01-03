
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { login } from "../services/api";
import { useDispatch } from 'react-redux';
import { setToken } from "../states/user-information/actions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focusField, setFocusField] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(''); // To store API response messages

  const navigate = useNavigate(); // React Router for navigation

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const getIconColor = (field) => {
    return focusField === field ? '#f42619' : 'gray';
  };

  // Email regex pattern for basic email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Check if the form is valid
  const isFormValid = () => {
    return email && password.length >= 8 && emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsLoading(true);
    setResponseMessage(''); // Clear previous messages

    try {
      const response = await login(email, password);
      if (response.status === 0) {
        // Success case
        setResponseMessage(response.message); // Show success message
        console.log('Token:', response.data.token);

        // Save token to local storage or context
        localStorage.setItem('token', response.data.token);
        dispatch(setToken(response.data.token)); // Store the token in Redux state
        // Navigate to another page (e.g., Home)
        navigate('/home'); // Adjust the route as necessary
      } else {
        // Failure case
        setResponseMessage(response.message); // Show error message
      }
    } catch (error) {
      // Handle error case
      setResponseMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage('');
      }, 2000);
      return () => clearTimeout(timer); // Clean up timer on unmount or update
    }
  }, [responseMessage]);

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center px-10">
        <div className="w-full max-w-[75%]">
          {/* Logo */}
          <div className="flex items-center mb-8 justify-center">
            <img
              src='Logo.png'// Replace with your illustration URL
              alt="Logo"
              className="mr-2"
            />
            <h1 className="text-3xl font-bold ">SIMS PPOB</h1>
          </div>

          {/* Form Header */}
          <h2 className="flex justify-center text-4xl text-center font-semibold  mb-12">Masuk atau buat akun untuk memulai</h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className={`mb-8 flex items-center border px-4 py-3.5 ${focusField === 'email' ? 'border-[#f42619]' : 'border-gray-300'}`}>
              <FaEnvelope className="mr-3" style={{ color: getIconColor('email') }} />
              <input
                type="email"
                placeholder="masukan email anda"
                className="w-full focus:outline-none"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                onFocus={() => setFocusField('email')}
                onBlur={() => setFocusField(null)}
              />
            </div>
            <div className={`flex items-center border px-4 py-3.5 ${focusField === 'password' ? 'border-[#f42619]' : 'border-gray-300'}`}>
              <FaLock className="mr-3" style={{ color: getIconColor('password') }} />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="masukkan password anda"
                className="w-full focus:outline-none"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                onFocus={() => setFocusField('password')}
                onBlur={() => setFocusField(null)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="focus:outline-none"
              >
                {passwordVisible ? <AiFillEyeInvisible className="text-gray-400" /> : <AiFillEye className="text-gray-400" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full rounded-md ${isFormValid() ? 'bg-[#f42619] hover:bg-red-600' : 'bg-gray-400'} mt-10 text-white py-3.5 font-semibold focus:outline-none focus:ring focus:ring-red-200`}
              style={{ pointerEvents: isFormValid() ? 'auto' : 'none' }}
              disabled={!isFormValid() || isLoading}
            >
              {isLoading ? 'Loading...' : 'Masuk'}
            </button>
          </form>

          {/* Footer */}
          <p className="flex justify-center text-base text-gray-600 mt-4">
            belum punya akun? registrasi&nbsp;<Link to="/register" className="text-[#f42619] hover:underline">di sini</Link>
          </p>

        </div>
        {/* Response Message */}
        {responseMessage && (
          <div className="absolute bottom-20 left-30 w-[40%] py-2 px-4 rounded-md flex justify-between bg-[#fff1f0] text-base text-[#f42619]">
            <p>
              {responseMessage}
            </p>
            <button
              className="focus:outline-none"
              onClick={() => setResponseMessage('')} // Allow manual dismissal
            >
              X
            </button>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-[#fff1f0] flex justify-center items-center relative">
        <div className="w-2/3">
          {/* Placeholder for Illustration */}
          <img
            src='Illustrasi Login.png'// Replace with your illustration URL
            alt="Illustration"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
