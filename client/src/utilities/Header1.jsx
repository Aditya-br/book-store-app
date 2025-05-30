import React from 'react'
import { Link } from 'react-router-dom'
const Header1 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-gray-50/60"></div>
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-100/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-indigo-100/30 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold text-blue-600 mb-4 tracking-tight">
            📚 Bookworm Store
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-medium max-w-md mx-auto">
            Discover your next favorite book and fuel your reading obsession
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <div className="relative group flex-1">
            
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <Link to="/login">
            <button className="relative w-full py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
              Login
            </button>
            </Link>
          </div>
          
          
          <div className="relative group flex-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <Link to="/signup">
            <button className="relative w-full py-4 text-lg font-semibold text-blue-600 bg-white/90 hover:bg-white border-2 border-blue-500/30 hover:border-blue-500/50 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
              Sign Up
            </button>
            </Link>
          </div>
          
          
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="text-3xl mb-2">📖</div>
            <h3 className="font-semibold text-gray-800 mb-1">Vast Collection</h3>
            <p className="text-sm text-gray-600">Thousands of books across all genres</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-800 mb-1">Best Prices</h3>
            <p className="text-sm text-gray-600">Affordable books for every budget</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="text-3xl mb-2">🚚</div>
            <h3 className="font-semibold text-gray-800 mb-1">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Quick and secure shipping</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header1