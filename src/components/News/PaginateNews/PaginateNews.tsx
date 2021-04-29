import React from 'react'
import NewsCard from '../NewsCard/NewsCard'
import { NewsInformation } from '../NewsInformation'
import ReactPaginate from 'react-paginate'

interface IPaginateNewsProps {
  news: NewsInformation[]
  currentPage: number
  actualPageSize: number
  totalRows: number
  showPaginator: boolean
  setPageHandler: React.Dispatch<number>
}

const PaginateNews = (props: IPaginateNewsProps) => {
  const onPageChanged = (page: number): void => props.setPageHandler(page)

  return (
    <>
      {props.news.map((singleNewCard: NewsInformation) => {
        return <NewsCard key={singleNewCard.id} new={singleNewCard} />
      })}

      {(!props.news || !props.news.length) && props.showPaginator && (
        <span className="d-flex justify-content-center text-info mt-4 mb-5 w-100 blockquote">
          There're no news in the page.
        </span>
      )}

      {((props.news && props.news.length) || props.showPaginator) && (
        <div className="d-flex justify-content-center pt-4">
          <ReactPaginate
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousLinkClassName={'page-link page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
            pageCount={props.totalRows}
            pageRangeDisplayed={props.actualPageSize}
            marginPagesDisplayed={props.actualPageSize}
            initialPage={props.currentPage}
            onPageChange={(ev) => onPageChanged(ev.selected)}
          ></ReactPaginate>
        </div>
      )}
    </>
  )
}

export default PaginateNews
