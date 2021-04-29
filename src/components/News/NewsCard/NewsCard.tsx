import React, { useState } from 'react'
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { NewsInformation, NewsInformationImage } from '../NewsInformation'
import { Lightbox } from 'react-modal-image'

import './NewsCard.scss'

interface INewsCardProps {
  new: NewsInformation
}

const NewsCard = (props: INewsCardProps) => {
  const [showImage, setShowImage] = useState(false)
  const [imageSourceUrl, setImageSourceUrl] = useState('')
  const [thumbImageSourceUrl, setThumbImageSourceUrl] = useState('')

  const createThumbnail = (image: NewsInformationImage): JSX.Element => {
    if (!image) {
      return <></>
    }

    const notAvailableImageUrl: string =
      'http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png'

    const imageSource =
      (image.thumbnail && image.thumbnail.length && image.thumbnail) ||
      (image.url && image.url.length && image.url) ||
      notAvailableImageUrl

    const handleImageClick = (imageSourceUrl: string, thumbImageUrl: string): void => {
      setImageSourceUrl(imageSourceUrl)
      setThumbImageSourceUrl(thumbImageUrl)
      setShowImage(true)
    }

    const renderTooltip = (props: {}) => (
      <Tooltip id="image-tooltip" {...props}>
        Click here to open this image.
      </Tooltip>
    )

    return (
      <OverlayTrigger placement="bottom" overlay={renderTooltip}>
        <Card.Img
          variant="top"
          src={imageSource}
          onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
            (event.currentTarget.src = notAvailableImageUrl)
          }
          onClick={() =>
            handleImageClick(
              (image.url && image.url.length && image.url) || imageSource,
              (image.thumbnail && image.thumbnail.length && image.thumbnail) || imageSource
            )
          }
        />
      </OverlayTrigger>
    )
  }

  const cardDescription = (description: string): string => {
    if (description && description.length) {
      const splittedDescription: string[] = description.split(' ')
      if (splittedDescription && splittedDescription.length >= 20) {
        return `${splittedDescription.slice(0, 20).join(' ')}...`
      }

      return `${description}...`
    }

    return description
  }

  return (
    <>
      {showImage && <Lightbox small={thumbImageSourceUrl} large={imageSourceUrl} className="cursor-default" alt="" onClose={() => setShowImage(false)} />}
      <Row lg={3} md={3} xs={3} className="custom-card px-2 pb-2">
        <Col>
          <Card>
            {createThumbnail(props.new.image)}
            <Card.Body className="px-0 pb-0 overflow-hidden">
              <Card.Title>{props.new.title}</Card.Title>
              <Card.Text className="overflow-hidden">{cardDescription(props.new.body)}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Card.Link className="read-more-link" href={props.new.url} target="_blank">
                Read more...
              </Card.Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default NewsCard
