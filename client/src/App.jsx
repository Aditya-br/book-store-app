import './App.css'
import Signup from './utilities/Signup';
import Login from './utilities/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header1 from './utilities/Header1';
import Home from './utilities/Home';
import Navbar from './utilities/Navbar';
import Sell from './utilities/Sell';
import Orders from './utilities/Orders';
import SaleDetails from './utilities/SaleDetails';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header1 />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Signup />
        </>
      ),
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/sell",
      element: (
        <>
          <Navbar />
          <Sell />
        </>
      ),
    },
    {
      path: "/orders",
      element: (
        <>
          <Navbar />
          <Orders />
        </>
      ),
    },
    {
      path: "/sales",
      element: (
        <>
          <Navbar />
          <SaleDetails />
        </>
      ),
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
