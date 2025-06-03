import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const Sell = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const user = useSelector(state => state.loginname.value);
  const navigate = useNavigate()
  const API_BASE_URL = "https://book-store-app-production-510c.up.railway.app";

  const onSubmit = async (data) => {
    const bookdata = {
      ...data,
      Owner: user
    }
    console.log(bookdata)
    if (Object.keys(errors).length === 0) {
      const response = await fetch(`${API_BASE_URL}/sell`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookdata),
      });
      const result = await response.json();
      console.log(bookdata, result)
      if (response.status === 201 || result.success) {
        navigate("/home")
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 flex items-center justify-center px-4 pt-32 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-indigo-200/20 to-blue-200/30 rounded-full blur-3xl translate-x-40 translate-y-40"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-100/20 to-pink-100/20 rounded-full blur-2xl -translate-x-32 -translate-y-32"></div>

      <div className="bg-white/90 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl p-10 w-full max-w-lg relative z-10 transform transition-all duration-300 hover:shadow-blue-500/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Sell Your Book</h2>
          <p className="text-gray-600 font-medium">Share your knowledge with the world</p>
        </div>

        <div className="flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative group">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <input
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 placeholder-gray-500 transition-all duration-300 font-medium"
              placeholder="Book Name"
              type="text"
              {...register("Name", { required: true })}
            />
            {errors.bookname && <p className="text-red-500 text-sm mt-2 font-medium">Required*</p>}
          </div>

          <div className="relative group">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <input
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 placeholder-gray-500 transition-all duration-300 font-medium"
              placeholder="Price In ₹"
              type="number"
              {...register("Price", { required: true })}
            />
            {errors.bookprice && <p className="text-red-500 text-sm mt-2 font-medium">Required*</p>}
          </div>

          <div className="relative group">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 placeholder-gray-500 transition-all duration-300 font-medium"
              placeholder="Image Cover"
              type="text"
              {...register("Cover", { required: true })}
            />
            {errors.bookcover && <p className="text-red-500 text-sm mt-2 font-medium">Required*</p>}
          </div>

          <div className="relative group">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 placeholder-gray-500 transition-all duration-300 font-medium"
              placeholder="Author Name"
              type="text"
              {...register("Author", { required: true })}
            />
            {errors.bookauthor && <p className="text-red-500 text-sm mt-2 font-medium">Required*</p>}
          </div>

          <button
            className="w-full py-4 mt-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/25 font-bold text-lg border border-white/20 backdrop-blur-sm"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Submit Book Details
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sell