import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { remove, removeall } from '../app/Orders';
import { Link } from 'react-router-dom';
const Orders = () => {
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const order = useSelector(state => state.orders.value)
    const total = order.reduce((acc, book) => acc + book.Price, 0);
    const user = useSelector(state => state.loginname.value);
    const dispatch = useDispatch();

    const handleRemove = (book) => {
        dispatch(remove(book._id))
        console.log(order)
    }

    const handlePurchase = async () => {
        setIsLoading(true);
        const o = [user, ...order]
        const response = await fetch("http://localhost:3000/buy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(o),
        });
        const result = await response.json();
        console.log(result)
        setIsLoading(false);
        if (response.status === 201 || result.success) {
            setPurchaseSuccess(true);
            dispatch(removeall())
            setTimeout(() => setPurchaseSuccess(false), 5000);
        }
    }

    if (purchaseSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform animate-pulse">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Thank you for your purchase! Your books are on their way.
                    </p>
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-green-700 font-medium">
                            You'll receive a confirmation email shortly with tracking details.
                        </p>
                    </div>
                    <Link to="/home">
                    <button 
                        onClick={() => setPurchaseSuccess(false)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                                   text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 
                                   transform hover:scale-105 hover:shadow-lg"
                    >
                        Continue Shopping
                    </button>
                    </Link>
                    
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                        <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        Your Orders
                    </h2>
                    
                    {order.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="text-xl text-gray-500 font-medium">No orders yet</p>
                            <p className="text-gray-400 mt-2">Start exploring our collection of books!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {order.map((book, index) => (
                                <div key={index} className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <img
                                                src={book.cover}
                                                alt={book.Name}
                                                className="w-24 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                                            />
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">{index + 1}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="ml-6 flex-1">
                                            <h3 className="font-bold text-xl text-gray-800 mb-2">{book.Name}</h3>
                                            <p className="text-gray-600 mb-2 flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                By {book.Author}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-2xl font-bold text-green-600">₹{book.Price}</p>
                                                <button 
                                                    onClick={() => { handleRemove(book) }}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg 
                                                               font-medium transition-colors duration-200 flex items-center space-x-2
                                                               hover:shadow-md transform hover:scale-105"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xl font-semibold text-gray-700">Total Amount:</span>
                                    <span className="text-3xl font-bold text-blue-600">₹{total}</span>
                                </div>
                                
                                <button 
                                    onClick={() => { handlePurchase() }}
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 
                                               text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 
                                               transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed
                                               flex items-center justify-center space-x-3"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            <span>Confirm Purchase</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Orders