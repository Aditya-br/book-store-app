import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../app/UserName';
import { add } from '../app/Orders';
import PushdownMenu from './PushdownMenu';

const Home = () => {
  const [showOrders, setShowOrders] = useState(false);
  const [total, setTotal] = useState(0);
  const [books, setBooks] = useState([]);
  const userid = useSelector(state => state.loginname.value);
  const user = useSelector(state => state.username.value);
  const [alreadyordered, setalreadyordered] = useState(false);
  const order = useSelector(state => state.orders.value);
  const [alreadyorderedid, setalreadyorderedid] = useState("");
  const dispatch = useDispatch();

  const API_BASE_URL = "https://book-store-app-production-510c.up.railway.app";

  useEffect(() => {
    fetch(`${API_BASE_URL}/getbooks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBooks(data.books);
        }
      })
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/getusername`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(update(data.name));
        }
      })
      .catch(error => console.error("Error fetching username:", error));
  }, []);

  const handleBuy = async (book) => {
    const alreadyexists = order.some((b) => b.Name === book.Name);
    if (alreadyexists) {
      setalreadyordered(true);
      setalreadyorderedid(book._id);
    } else {
      dispatch(add(book));
      setTotal(prev => prev + book.Price);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 text-gray-900 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-gray-50/40"></div>
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-100/15 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-100/15 rounded-full blur-3xl"></div>
      
      <header className="flex justify-between items-center px-6 py-4 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-20 gap-6">
        <h1 className="text-3xl font-bold tracking-tight text-blue-600 select-none">
          📚 Welcome, <span className="capitalize">{user}</span>!
        </h1>
        <Link to="/sell">
          <button className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-4xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 font-medium">
            Sell your book
          </button>
        </Link>
          <PushdownMenu />
      </header>

      <main className="px-6 py-8 flex-grow max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/60 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/95"
            >
              <img
                src={book.cover}
                alt={book.Name}
                className="w-full h-64 object-contain bg-gradient-to-br from-gray-50 to-gray-100/80"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{book.Name}</h3>
                <p className="mt-1 text-sm text-gray-600 truncate">By {book.Author}</p>
                <p className="mt-2 text-blue-600 font-bold text-lg">₹{book.Price}</p>
                {alreadyordered && book._id === alreadyorderedid && (
                  <p className="mt-2 text-red-500 text-sm font-medium bg-red-50/80 p-2 rounded-xl border border-red-200/60">
                    Book is already ordered. Go to orders to complete the purchase!
                  </p>
                )}
                <div className="relative group mt-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                  <button
                    onClick={() => handleBuy(book)}
                    className="relative w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-400/50 transform hover:-translate-y-1"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;