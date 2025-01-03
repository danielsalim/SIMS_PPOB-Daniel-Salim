import { useState } from "react";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [focusField, setFocusField] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [email, setEmail] = useState("");
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const API_URL = "https://take-home-test-api.nutech-integrasi.com";

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    checkPasswordMatch(event.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    checkPasswordMatch(password, event.target.value);
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    setPasswordMatchError(password !== confirmPassword);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const getIconColor = (field) => {
    return focusField === field ? "#f42619" : "gray";
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const isFormValid = () => {
    return (
      email &&
      emailRegex.test(email) &&
      namaDepan &&
      namaBelakang &&
      password.length >= 8 &&
      confirmPassword.length >= 8 &&
      !passwordMatchError
    );
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/registration`, {
        email,
        first_name: namaDepan,
        last_name: namaBelakang,
        password,
      });

      // Check for success status (200)
      setResponseMessage({
        type: "success",
        message: response.data.message || "Registration successful!",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";

      // Handle error status
      setResponseMessage({
        type: "error",
        message: errorMessage,
      });
    }

    // Hide the message after 2 seconds
    setTimeout(() => setResponseMessage(null), 2000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center px-10">
        <div className="w-full max-w-[75%]">
          <div className="flex items-center mb-8 justify-center">
            <img src='Logo.png' alt="Logo" className="mr-2" />
            <h1 className="text-3xl font-bold ">SIMS PPOB</h1>
          </div>
          <h2 className="flex justify-center text-4xl text-center font-semibold  mb-12">
            Lengkapi data untuk membuat akun
          </h2>

          <form onSubmit={handleRegistration}>
            {/* Email */}
            <div
              className={`mb-8 flex items-center border px-4 py-3.5 ${focusField === "email" ? "border-[#f42619]" : "border-gray-300"
                }`}
            >
              <FaEnvelope className="mr-3" style={{ color: getIconColor("email") }} />
              <input
                type="email"
                placeholder="masukan email anda"
                className="w-full focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusField("email")}
                onBlur={() => setFocusField(null)}
              />
            </div>
            {/* Nama Depan */}
            <div
              className={`mb-8 flex items-center border px-4 py-3.5 ${focusField === "namaDepan" ? "border-[#f42619]" : "border-gray-300"
                }`}
            >
              <FaUser className="mr-3" style={{ color: getIconColor("namaDepan") }} />
              <input
                type="text"
                placeholder="nama depan"
                className="w-full focus:outline-none"
                onChange={(e) => setNamaDepan(e.target.value)}
                onFocus={() => setFocusField("namaDepan")}
                onBlur={() => setFocusField(null)}
              />
            </div>
            {/* Nama Belakang */}
            <div
              className={`mb-8 flex items-center border px-4 py-3.5 ${focusField === "namaBelakang" ? "border-[#f42619]" : "border-gray-300"
                }`}
            >
              <FaUser className="mr-3" style={{ color: getIconColor("namaBelakang") }} />
              <input
                type="text"
                placeholder="nama belakang"
                className="w-full focus:outline-none"
                onChange={(e) => setNamaBelakang(e.target.value)}
                onFocus={() => setFocusField("namaBelakang")}
                onBlur={() => setFocusField(null)}
              />
            </div>
            {/* Password */}
            <div
              className={`mb-8 flex items-center border px-4 py-3.5 ${focusField === "password" ? "border-[#f42619]" : "border-gray-300"
                }`}
            >
              <FaLock className="mr-3" style={{ color: getIconColor("password") }} />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="buat password"
                className="w-full focus:outline-none"
                value={password}
                onChange={handlePasswordChange}
                onFocus={() => setFocusField("password")}
                onBlur={() => setFocusField(null)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="focus:outline-none"
              >
                {passwordVisible ? (
                  <AiFillEyeInvisible className="text-gray-400" />
                ) : (
                  <AiFillEye className="text-gray-400" />
                )}
              </button>
            </div>
            {/* Confirm Password */}
            <div
              className={`flex items-center border px-4 py-3.5 ${focusField === "confirmPassword"
                ? "border-[#f42619]"
                : "border-gray-300"
                }`}
            >
              <FaLock className="mr-3" style={{ color: getIconColor("confirmPassword") }} />
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="konfirmasi password"
                className="w-full focus:outline-none"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onFocus={() => setFocusField("confirmPassword")}
                onBlur={() => setFocusField(null)}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="focus:outline-none"
              >
                {confirmPasswordVisible ? (
                  <AiFillEyeInvisible className="text-gray-400" />
                ) : (
                  <AiFillEye className="text-gray-400" />
                )}
              </button>
            </div>
            {password && confirmPassword && !passwordMatchError && password === confirmPassword && (
              <p className="text-green-500 text-sm flex justify-end">
                Password sudah cocok
              </p>
            )}
            {password && confirmPassword && passwordMatchError && (
              <p className="text-[#f42619] text-sm flex justify-end">
                Password tidak sama
              </p>
            )}

            <button
              type="submit"
              className={`w-full rounded-md ${isFormValid() ? "bg-[#f42619] hover:bg-red-600" : "bg-gray-400"
                } mt-10 text-white py-3.5 font-semibold focus:outline-none focus:ring focus:ring-red-200`}
              style={{ pointerEvents: isFormValid() ? "auto" : "none" }}
            >
              Registrasi
            </button>
          </form>

          <p className="flex justify-center text-base text-gray-600 mt-4">
            sudah punya akun? login&nbsp;
            <Link to="/login" className="text-[#f42619] hover:underline">
              di sini
            </Link>
          </p>
        </div>
        {responseMessage && (
          <div
            className={`absolute bottom-20 left-30 w-[40%] py-2 px-4 rounded-md flex justify-between text-base ${responseMessage.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-[#fff1f0] text-[#f42619]"
              }`}
          >
            <p>{responseMessage.message}</p>
            <button
              className="font-bold"
              onClick={() => setResponseMessage(null)} // Clear the message
            >
              X
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 bg-[#fff1f0] flex justify-center items-center relative">
        <div className="w-2/3">
          <img src='Illustrasi Login.png' alt="Illustration" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
