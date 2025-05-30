import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { update } from '../app/LoginName';
const Login = () => {
  const [loginfail, setloginfail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.status === 200 || result.success) {
          dispatch(update(result.id));
          navigate("/home");
        } else {
          setloginfail(true);
          setError("invaliduser", { message: "Invalid credentials, sign up if you are a new user!" });
        }
      } catch (error) {
        console.error("Login error:", error);
        setloginfail(true);
        setError("invaliduser", { message: "Error during login. Please try again." });
      }
    }
  };

  const handleInputChange = () => {
    if (loginfail && errors.invaliduser) {
      setloginfail(false);
      clearErrors("invaliduser");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-blue-100/20"></div>
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl"></div>
      
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-slate-200/50 rounded-3xl p-12 w-full max-w-md relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-700 mb-2 select-none">
            Login
          </h2>
          <p className="text-center text-slate-600 text-sm mb-8 font-medium">Welcome back to Bookworm Store</p>
          
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)} method="POST" noValidate>
            <div className="relative group">
              <input
                className={`w-full p-4 border-2 rounded-xl bg-white/60 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 ${
                  errors.firstName ? 'border-red-400 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="First Name"
                type="text"
                {...register("firstName", { required: true })}
                onChange={(e) => {
                  register("firstName").onChange(e);
                  handleInputChange();
                }}
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName && (
                <p role="alert" className="text-red-500 text-sm mt-1 font-medium">
                  Required*
                </p>
              )}
            </div>

            <div className="relative group">
              <input
                className={`w-full p-4 border-2 rounded-xl bg-white/60 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 ${
                  errors.lastName ? 'border-red-400 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Last Name"
                type="text"
                {...register("lastName", { required: true })}
                onChange={(e) => {
                  register("lastName").onChange(e);
                  handleInputChange();
                }}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName && (
                <p role="alert" className="text-red-500 text-sm mt-1 font-medium">
                  Required*
                </p>
              )}
            </div>

            <div className="relative group">
              <input
                className={`w-full p-4 border-2 rounded-xl bg-white/60 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 ${
                  errors.password ? 'border-red-400 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: { value: 8, message: "At least 8 characters required" }
                })}
                onChange={(e) => {
                  register("password").onChange(e);
                  handleInputChange();
                }}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p role="alert" className="text-red-500 text-sm mt-1 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {loginfail && errors.invaliduser && (
              <div className="bg-red-50/50 border border-red-200 rounded-xl p-4">
                <p role="alert" className="text-red-600 text-sm font-semibold text-center">
                  {errors.invaliduser.message}
                </p>
              </div>
            )}

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-15 group-hover:opacity-40 transition duration-300"></div>
              <button
                className="relative w-full p-4 mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;