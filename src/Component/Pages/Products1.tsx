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
import { OnPageChangeCallback, ReduxData } from '../Types'
import { filledStar, emptyStar } from '../../commonFunction'

const Products1: React.FC = () => {
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
    console.log(serachProduct, 'serachProduct')
    const [currentItems, setCurrentItems] = useState<ReduxData[]>([])
    const [pageCount, setPageCount] = useState<number>(0)
    const [itemOffset, setItemOffset] = useState<number>(0)
    const [search, setSearch] = useState<string>('')
    const [clearDiv, setClearDiv] = useState<boolean>(false)
    const [searchPr, setSearchPr] = useState<boolean>(false)

    const itemsPerPage = 8

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(serachProduct.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(serachProduct.length / itemsPerPage))
    }, [itemOffset, serachProduct])

    useEffect(() => {
        dispatch(getAllProduct())
        dispatch(getSearchProduct(''))
        setClearDiv(true)
    }, [dispatch])

    const handlePageClick: OnPageChangeCallback = (event) => {
        const newOffset = (event.selected * itemsPerPage) % serachProduct.length
        setItemOffset(newOffset)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (search !== '' && e.key === 'Enter') {
            setSearchPr(true)
            dispatch(getSearchProduct(search))
            setClearDiv(false)
        }
    }

    const clearSearch = () => {
        setSearch('')
        setSearchPr(false)
        dispatch(getSearchProduct(''))
        setClearDiv(true)
    }

    console.log(currentItems, 'currentItems')

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
                        {!searchPr
                            ? currentItems.map((item) => (
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
                                      <h3 className="brandName">
                                          {item.brand}
                                      </h3>
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
                              ))
                            : ''}
                    </div>
                    <ReactPaginate
                        previousLabel={
                            currentItems.length !== 0 ? '← Previous' : ''
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

export default Products1
