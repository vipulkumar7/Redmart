import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faRupeeSign,
    faStar,
    faStarHalfAlt,
} from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer'
import Header from './Header'
import {
    getAllProduct,
    getSearchProduct,
} from '../../redux/productPage/actions'
import { useDocumentTitle } from '../setDocumentTitle'
// import Loader from '../Loader'
import { RootState } from '../../redux/rootReducer'
import { ISort, OnPageChangeCallback, ReduxData } from '../Types'
import { filledStar, emptyStar } from '../../commonFunction'

const Products: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useDocumentTitle('Products')

    // const productSpinner: boolean = useSelector(
    //     (state: RootState) => state.productReducer.productSpinner
    // )
    // const items: ReduxData[] = useSelector((state: RootState) => state.productReducer.productAllData);
    const serachProduct: ReduxData[] = useSelector(
        (state: RootState) => state.productReducer.serachProduct
    )

    const [currentItems, setCurrentItems] = useState<ReduxData[]>([])
    const [pageCount, setPageCount] = useState<number>(0)
    const [itemOffset, setItemOffset] = useState<number>(0)
    const [search, setSearch] = useState<string>('')
    const [clearDiv, setClearDiv] = useState<boolean>(false)

    const itemsPerPage = 8

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(serachProduct.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(serachProduct.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, serachProduct])

    useEffect(() => {
        dispatch(getAllProduct())
        dispatch(getSearchProduct(''))
        setClearDiv(true)
    }, [dispatch])

    const handlePageClick: OnPageChangeCallback = (event) => {
        const newOffset = (event.selected * itemsPerPage) % serachProduct.length
        setItemOffset(newOffset)
    }

    const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrentItems = [...currentItems]
        if (e.target.value === 'sortByRating') {
            setCurrentItems(
                newCurrentItems.sort(
                    (a: ISort, b: ISort) => a.rating.rate - b.rating.rate
                )
            )
        } else if (e.target.value === 'sortByPrice') {
            setCurrentItems(
                newCurrentItems.sort((a: ISort, b: ISort) => a.price - b.price)
            )
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (search !== '' && e.key === 'Enter') {
            dispatch(getSearchProduct(search))
            setClearDiv(false)
        }
    }

    const clearSearch = () => {
        setSearch('')
        dispatch(getSearchProduct(''))
        setClearDiv(true)
    }

    return (
        <div id="page-container">
            <Header />
            {
            // productSpinner ? (
            //     <Loader />
            // ) :
             (
                <div className="small-container" id="content-wrap">
                    <div className="row row-2">
                        <h2>All Products</h2>
                        <input
                            className="search"
                            type="search"
                            placeholder="Search here"
                            value={search}
                            onKeyPress={(e) => {
                                handleKeyPress(e)
                            }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <select
                            className="dropdown1"
                            defaultValue={'default'}
                            onChange={(e) => {
                                handleSorting(e)
                            }}
                        >
                            <option value="default" disabled>
                                Default Sorting
                            </option>
                            <option value="sortByPrice">Sort by Price</option>
                            <option value="sortByRating">Sort by Rating</option>
                        </select>
                    </div>
                    <div className="row row-3">
                        <span>
                            {!clearDiv ? `Search Results on ${search}` : ``}
                        </span>
                        <span
                            className="cursor"
                            onClick={() => {
                                clearSearch()
                            }}
                            style={{ color: 'red' }}
                        >
                            {!clearDiv ? 'Clear' : ''}
                        </span>
                    </div>
                    <div className="row">
                        {currentItems &&
                            currentItems.map((item) => (
                                <div
                                    className="col_4"
                                    key={item.id}
                                    onClick={() => {
                                        navigate(`/product/${item.id}`)
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt="item-1"
                                        width="230px"
                                        height="300px"
                                        loading="lazy"
                                    />
                                    <h3 className="brandName">{item.brand}</h3>
                                    <h4>{item.title}</h4>
                                    <div className="rating">
                                        {filledStar(item).map((it, index) => (
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                key={index}
                                            />
                                        ))}
                                        {emptyStar(item).map((it, index) => (
                                            <FontAwesomeIcon
                                                icon={faStarHalfAlt}
                                                key={index}
                                            />
                                        ))}
                                    </div>
                                    <p>
                                        <FontAwesomeIcon icon={faRupeeSign} />{' '}
                                        {item.price}
                                    </p>
                                </div>
                            ))}
                    </div>
                    <ReactPaginate
                        previousLabel={
                            currentItems.length !== 0 ? '← Prev' : ''
                        }
                        nextLabel={currentItems.length !== 0 ? 'Next →' : ''}
                        breakLabel={'...'}
                        disabledClassName={'disable-decrement-cart'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            )}
            <Footer />
        </div>
    )
}

export default Products
