import { lazy } from 'react'

const Home = lazy(() => import('../Component/Pages/Home'))
const Products = lazy(() => import('../Component/Pages/Products'))
const ProductDetails = lazy(() => import('../Component/Pages/ProductDetails'))
const Cart = lazy(() => import('../Component/Pages/Cart'))
const SignUp = lazy(() => import('../Component/Pages/SignUp'))
const Login = lazy(() => import('../Component/Pages/Login'))
const About = lazy(() => import('../Component/Pages/About'))
const Contact = lazy(() => import('../Component/Pages/Contact'))
const Profile = lazy(() => import('../Component/Pages/Profile'))
const NoPageFound = lazy(() => import('../Component/Pages/NoPageFound'))

const routes = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/products', name: 'Products', component: Products },
    { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
    { path: '/cart', name: 'Cart', component: Cart },
    { path: '/signUp', name: 'SignUp', component: SignUp },
    { path: '/login', name: 'Login', component: Login },
    { path: '/about', name: 'About', component: About },
    { path: '/contact', name: 'Contact', component: Contact },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '*', name: 'NoPageFound', component: NoPageFound },
]

export default routes
