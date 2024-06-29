import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import Footer from './Footer'
import Header from './Header'
import { useDocumentTitle } from '../setDocumentTitle'
import { OnPageChangeCallback, RandomData } from '../Types'
import { RootState } from '../../redux/rootReducer'
import { getRandomData } from '../../redux/aboutPage/actions'

const About: React.FC = () => {
    const dispatch = useDispatch()
    useDocumentTitle('About')

    const items: RandomData[] = useSelector(
        (state: RootState) => state.aboutReducer.randomData
    )

    const [currentItems, setCurrentItems] = useState<RandomData[]>([])
    const [pageCount, setPageCount] = useState<number>(0)
    const [itemOffset, setItemOffset] = useState<number>(0)
    const itemsPerPage = 4

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(items.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(items.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, items])

    const handlePageClick: OnPageChangeCallback = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length
        setItemOffset(newOffset)
    }

    useEffect(() => {
        dispatch(getRandomData())
    }, [dispatch])

    return (
        <div id="page-container">
            <Header />
            <div id="content-wrap">
                <div className="header-margin">
                    {currentItems &&
                        currentItems.map((item: RandomData) => (
                            <div key={item.id} className="post">
                                <h3>{`${item.title} - ${item.id}`}</h3>
                                <p>{item.body}</p>
                            </div>
                        ))}
                </div>
                <ReactPaginate
                    previousLabel={'← Prev'}
                    nextLabel={'Next →'}
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
            <Footer />
        </div>
    )
}

export default About
