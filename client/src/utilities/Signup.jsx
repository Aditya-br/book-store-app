import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { update } from '../app/LoginName';

const Signup = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_BASE_URL = "https://book-store-app-production-510c.up.railway.app";

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Does not match the above password" });
    } else if (Object.keys(errors).length === 0) {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.status === 201 || result.success) {
        console.log("Signup successful:", data);
        dispatch(update(result.id));
        console.log(result.id)
        navigate("/home");
      } else if (result.message === "Already available") {
        setError("alreadyavailable", { message: "Name already taken! Refresh and try again" });
      } else {
        console.error("Unknown error during signup");
      }
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
            Sign Up
          </h2>
          <p className="text-center text-slate-600 text-sm mb-8 font-medium">Join the Bookworm community</p>

          <form className="flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className="relative group">
              <input
                className={`w-full p-4 border-2 rounded-xl bg-white/60 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 ${errors.firstName ? 'border-red-400 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                placeholder="First Name"
                type="text"
                {...register("firstName", { required: "First Name is required" })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1 font-medium">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="relative group">
              <input
                className={`w-full p-4 border-2 rounded-xl bg-white/60 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 ${errors.lastName ? 'border-red-400 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                placeholder="Last Name"
                type="text"
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1 font-medium">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="relative group">
              <input
                className={`w-full p-4 border-2 rounded-xl bg-white/60 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 ${errors.password ? 'border-red-400 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                placeholder="Password"
                type="password"
                {...register("password", { required: "Password is required", minLength: { value: 8, message: "At least 8 characters required" } })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative group">
              <input
                className={`w-full p-4 border-2 rounded-xl bg-white/60 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 ${errors.confirmPassword ? 'border-red-400 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'
                  }`}
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword", { required: "Confirm Password is required" })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 font-medium">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {errors.alreadyavailable && (
              <div className="bg-red-50/50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm font-semibold text-center">
                  {errors.alreadyavailable.message}
                </p>
              </div>
            )}

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-15 group-hover:opacity-40 transition duration-300"></div>
              <button
                className="relative w-full p-4 mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
                type="submit"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;