import React, { useCallback, useContext, useEffect, useState } from 'react'

import { useFormik } from 'formik'
import { Button, Col, Container, FormControl, InputGroup, Row, Spinner } from 'react-bootstrap'
import { ServiceContext } from '../../services/context/ServiceContext'
import { NewsInformation, NewsInformationResponse } from './NewsInformation'

import PaginateNews from './PaginateNews/PaginateNews'

import './NewsContent.scss'

interface INewsContentProps {
  searchText?: string
}

const validate = (values: INewsContentProps) => {
  const errors: INewsContentProps = {}

  if (!values.searchText) {
    errors.searchText = `Field required`
  } else if (values.searchText.length < 5) {
    errors.searchText = `Search text must be 5 characters or more.`
  }

  return errors
}

const renderSpinner = () => {
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col className="d-flex justify-content-center mt-5 pt-5">
          <Spinner animation="border" variant="primary" className="spinner" />
        </Col>
      </Row>
    </Container>
  )
}

const NewsContent: React.FC = () => {
  const [news, setNews] = useState([] as NewsInformation[])

  const [page, setPage] = useState(0)
  const [totalRowCount, setTotalRowCount] = useState(0)

  const [loading, setLoading] = useState(false)
  const [showPaginator, setShowPaginator] = useState(false)

  const searchServiceContext = useContext(ServiceContext)
  const actualPageSize: number = 6

  const processSearchRequest = useCallback(
    (searchText: string) => {
      if (!searchText || searchText.length < 5) {
        return
      }

      setLoading(true)

      searchServiceContext.searchByQuery(searchText, page, actualPageSize).then(
        (response: NewsInformationResponse | undefined) => {
          setLoading(false)
          if (response && response.value) {
            setNews(response.value || [])
            setShowPaginator(!response.value.length && page > 1)
            setTotalRowCount(Math.ceil(response.totalCount / actualPageSize))
          }
        },
        (err: any) => {
          setLoading(false)
          throw err
        }
      )
    },
    [page, actualPageSize, searchServiceContext]
  )

  const formik = useFormik({
    initialValues: {
      searchText: '',
    },
    onSubmit: (values: INewsContentProps) => {
      if (values && values.searchText) {
        const { searchText } = values
        processSearchRequest(searchText)
      }
    },
    validate,
  })

  useEffect(() => {
    processSearchRequest((formik.values && formik.values.searchText) || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, processSearchRequest])

  return (
    <div className="news pt-2">
      <h1 className="pt-2">News search</h1>
      <form className="pt-2" onSubmit={formik.handleSubmit}>
        <InputGroup
          className={
            formik.errors.searchText && formik.errors.searchText.length >= 5
              ? `invalid-field mb-3`
              : !formik.touched || !formik.dirty
              ? `mb-3`
              : `mb-3`
          }
        >
          <FormControl
            id="searchText"
            placeholder="Filter here..."
            aria-label="Filter here..."
            aria-describedby="basic-addon2"
            onChange={formik.handleChange}
            value={formik.values.searchText}
          />
          <Button
            className="ml-2"
            variant="primary"
            type="submit"
            disabled={Boolean(formik.errors.searchText) || !formik.dirty}
          >
            Search
          </Button>
        </InputGroup>

        {formik.errors.searchText && (
          <div className="d-flex text-danger my-3">{formik.errors.searchText}</div>
        )}
      </form>

      <Container className="d-flex flex-wrap justify-content-center">
        {loading ? (
          renderSpinner()
        ) : (
          <PaginateNews
            news={news}
            currentPage={page}
            actualPageSize={actualPageSize}
            totalRows={totalRowCount}
            setPageHandler={setPage}
            showPaginator={showPaginator}
          />
        )}
      </Container>
    </div>
  )
}

export default NewsContent
