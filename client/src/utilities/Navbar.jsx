import React, { useEffect } from 'react'
import { Link } from 'react-router';

const Navbar = () => {
    const userid = "sample_user_id";
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 text-black flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-blue-50/20 to-indigo-50/30"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-indigo-100/20 to-blue-100/30 rounded-full blur-3xl translate-x-40 translate-y-40"></div>
      
      <header className="items-center px-8 py-6 bg-white/80 backdrop-blur-2xl shadow-xl border-b border-gray-200/30 flex justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-xl">📚</span>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Bookworm Store
          </h1>
        </div>
        <Link to="/home">
        <button className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white rounded-2xl shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-blue-500/25 font-semibold border border-white/20 backdrop-blur-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Back to store
        </button>
        </Link>
        <Link to="/">
        <button className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white rounded-2xl shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-blue-500/25 font-semibold border border-white/20 backdrop-blur-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
        </Link>
      </header>
    </div>
  )
}

export default Navbar