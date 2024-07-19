import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from './Component/Loader'
import Profile from './Component/Pages/Profile'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
// import PrivateRoute from './routing/PrivateRoute'
import { AuthProvider } from "./contexts/authContext";
import { Analytics } from '@vercel/analytics/react';

const Home = lazy(() => import('./Component/Pages/Home'))
const Products = lazy(() => import('./Component/Pages/Products'))
const ProductDetails = lazy(() => import('./Component/Pages/ProductDetails'))
const Cart = lazy(() => import('./Component/Pages/Cart'))
const Checkout = lazy(() => import('./Component/Pages/Checkout'))
const Payment = lazy(() => import('./Component/Pages/Payment'))
const Orders = lazy(() => import('./Component/Pages/Orders'))
const OrderDetails = lazy(() => import('./Component/Pages/OrderDetails'))
const Address = lazy(() => import('./Component/Pages/Address'))
const SignUp = lazy(() => import('./Component/Pages/SignUp'))
const Login = lazy(() => import('./Component/Pages/Login'))
const About = lazy(() => import('./Component/Pages/About'))
const Contact = lazy(() => import('./Component/Pages/Contact'))
const NoPageFound = lazy(() => import('./Component/Pages/NoPageFound'))

const PUBLIC_KEY =
  'pk_test_51KOgC1SGd6M5DoimUdytan6svLguzqsoUyFCcQnFkR0P4Dp4fU4YkwyftVx9VuLjvhrzCJGozuy7gqDsVXOoySBf00QpnOLDqt'
const stripePromise = loadStripe(PUBLIC_KEY)

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1500} />
      <Suspense fallback={<Loader />}>
        <Elements stripe={stripePromise}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route
                path="/product/:id"
                element={<ProductDetails />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/orders" element={<Orders />} />
              <Route
                path="/order_details/:id"
                element={<OrderDetails />}
              />
              <Route path="/address" element={<Address />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NoPageFound />} />
            </Routes>
            <Analytics />
          </AuthProvider>
        </Elements>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
