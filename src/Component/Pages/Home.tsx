import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { SpinnerCircular } from 'spinners-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faQuoteLeft,
    faRupeeSign,
    faStar,
    faStarHalfAlt,
} from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer'
import Header from './Header'
import { imagePath } from '../../utils/images'
// import Loader from '../Loader'
import { RootState } from '../../redux/rootReducer'
import { useDocumentTitle } from '../setDocumentTitle'
import { QuotesReduxData, ReduxData } from '../Types'
import {
    getAllProduct,
    getFeaturedProduct,
    getLatestProduct,
    getExclusiveProduct,
    getQuotes,
} from '../../redux/productPage/actions'
import { filledStar, emptyStar } from '../../commonFunction'
import { getCart, postCart } from '../../redux/cart/actions'
import { getOrders } from '../../redux/orders/actions'
import { getAddress } from '../../redux/address/actions'

const Home: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useDocumentTitle('Home')

    const productSpinner: boolean = useSelector(
        (state: RootState) => state.productReducer.productSpinner
    )
    const featureProductData: ReduxData[] = useSelector(
        (state: RootState) => state.productReducer.featureProductData
    )
    const latestProductData: ReduxData[] = useSelector(
        (state: RootState) => state.productReducer.latestProductData
    )
    const exclusiveProduct: ReduxData = useSelector(
        (state: RootState) => state.productReducer.exclusiveProduct
    )
    const quotes: QuotesReduxData[] = useSelector(
        (state: RootState) => state.productReducer.quotes
    )

    useEffect(() => {
        dispatch(getAllProduct())
        dispatch(getFeaturedProduct())
        dispatch(getLatestProduct())
        dispatch(getExclusiveProduct())
        dispatch(getQuotes())
        dispatch(getCart())
        dispatch(getOrders())
        dispatch(getAddress())
    }, [dispatch])

    const onClickProductDetails = (productID: number) => {
        navigate(`/product/${productID}`)
    }

    const onClickAddToCart = (
        _e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        productDescData: ReduxData
    ) => {
        exclusiveProduct.quantity = 1
        dispatch(postCart(productDescData))
    }
    return (
        <div id="page-container">
            <Header />
            <div id="content-wrap">
                <div className="header">
                    <div className="container">
                        <div className="row">
                            <div className="col_2">
                                <h1>
                                    Give Your Workout
                                    <br /> A New Style!
                                </h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Illum quae doloribus
                                    voluptatibus,
                                    <br />
                                    tenetur pariatur fugit nobis assumenda
                                    itaque!{' '}
                                </p>
                                <NavLink to="/products" className="btn1">
                                    Explore Now &#8594;
                                </NavLink>
                            </div>
                            <div className="col_2">
                                <img
                                    className='home_img'
                                    src={imagePath.image}
                                    alt="image1.jpeg"
                                    loading="lazy"
                                // width={'640px'}
                                // height={'652px'}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Categories Start */}
                <div className="categories">
                    <div className="small-container">
                        <div className="row">
                            <div className="col_3">
                                <img
                                    src={imagePath.category1}
                                    alt="category-1"
                                    loading="lazy"
                                />
                            </div>
                            <div className="col_3">
                                <img
                                    src={imagePath.category2}
                                    alt="category-2"
                                    loading="lazy"
                                />
                            </div>
                            <div className="col_3">
                                <img
                                    src={imagePath.category3}
                                    alt="category-3"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Products Start */}

                <div className="small-container">
                    <h2 className="title">Featured Products</h2>
                    {
                    // productSpinner ? (
                    //     <Loader />
                    // ) : 
                    (
                        <div className="row">
                            {featureProductData?.map((product) => (
                                <div
                                    className="col_4"
                                    key={product.id}
                                    onClick={() => {
                                        onClickProductDetails(product.id)
                                    }}
                                >
                                    <NavLink to="/product-details">
                                        <img
                                            src={product.image}
                                            alt="product-1"
                                            width="230px"
                                            height="300px"
                                            loading="lazy"
                                        />
                                    </NavLink>
                                    <NavLink to="/product-details">
                                        <h4>{product.title}</h4>
                                    </NavLink>
                                    <div className="rating">
                                        {filledStar(product).map(
                                            (_it, index) => (
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                    key={index}
                                                />
                                            )
                                        )}
                                        {emptyStar(product).map((_it, index) => (
                                            <FontAwesomeIcon
                                                icon={faStarHalfAlt}
                                                key={index}
                                            />
                                        ))}
                                    </div>
                                    <p>
                                        <FontAwesomeIcon icon={faRupeeSign} />{' '}
                                        {product.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Featured Products End */}

                {/* Featured Latest Start */}
                <div className="small-container">
                    <h2 className="title">Latest Products</h2>
                    {productSpinner ? (
                        <SpinnerCircular
                            className="spinner"
                            size={200}
                            thickness={100}
                            speed={100}
                            color="#36ad47"
                            secondaryColor="rgba(0, 0, 0, 0.44)"
                        />
                    ) : (
                        <div className="row">
                            {latestProductData.map((product) => (
                                <div
                                    className="col_4"
                                    key={product.id}
                                    onClick={() => {
                                        onClickProductDetails(product.id)
                                    }}
                                >
                                    <img
                                        src={product.image}
                                        alt="product-5"
                                        width="230px"
                                        height="300px"
                                        loading="lazy"
                                    />
                                    <h4>{product.title}</h4>
                                    <div className="rating">
                                        {filledStar(product).map(
                                            (_it, index) => (
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                    key={index}
                                                />
                                            )
                                        )}
                                        {emptyStar(product).map((_it, index) => (
                                            <FontAwesomeIcon
                                                icon={faStarHalfAlt}
                                                key={index}
                                            />
                                        ))}
                                    </div>
                                    <p>
                                        <FontAwesomeIcon icon={faRupeeSign} />{' '}
                                        {product.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Featured Latest End */}

                {/* Offer Start */}
                <div className="offer">
                    <div className="small-container">
                        {productSpinner ? (
                            <SpinnerCircular
                                className="spinner"
                                size={200}
                                thickness={100}
                                speed={100}
                                color="#36ad47"
                                secondaryColor="rgba(0, 0, 0, 0.44)"
                            />
                        ) : (
                            <div className="row">
                                <div className="col_2">
                                    <img
                                        src={exclusiveProduct?.image}
                                        alt="exclusive"
                                        className="offer-img"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="col_2">
                                    <p>Exclusively Available on RedStore</p>
                                    <h1>{exclusiveProduct?.title}</h1>
                                    <small>
                                        {exclusiveProduct?.description}
                                    </small>
                                    <div>
                                        <NavLink
                                            to="/cart"
                                            className="btn1"
                                            onClick={(e) => {
                                                onClickAddToCart(
                                                    e,
                                                    exclusiveProduct
                                                )
                                            }}
                                        >
                                            Buy Now &#8594;
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Offer End */}

                {/* Testimonial Start */}
                <div className="testimonial">
                    <div className="small-container">
                        <div className="row">
                            {quotes.map((item) => (
                                <div className="col_3" key={item.id}>
                                    <FontAwesomeIcon
                                        icon={faQuoteLeft}
                                        className="fa-quote-left"
                                    />
                                    <p>{item.quote}</p>
                                    <div className="rating">
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStarHalfAlt} />
                                    </div>
                                    <img
                                        src={item.image}
                                        alt="user-1"
                                        loading="lazy"
                                    />
                                    <h3>{item.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Testimonial Start */}

                {/* Brands Start */}

                <div className="brands">
                    <div className="small-container">
                        <div className="row">
                            <div className="col_5">
                                <img
                                    src={imagePath.logoGodrej}
                                    alt="logo-godrej"
                                    loading="lazy"
                                />
                            </div>
                            <div className="col_5">
                                <img
                                    src={imagePath.logoOppo}
                                    alt="logo-oppo"
                                    loading="lazy"
                                />
                            </div>
                            <div className="col_5">
                                <img
                                    src={imagePath.logoCocaCola}
                                    alt="logo-coca-cola"
                                    loading="lazy"
                                />
                            </div>
                            <div className="col_5">
                                <img
                                    src={imagePath.logoPaypal}
                                    alt="logo-paypal"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
