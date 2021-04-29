export interface NewsInformation {
  id: string
  title: string
  url: string
  body: string
  datePublished: string
  description: string
  image: NewsInformationImage
  keywords: string
  language: string
  provider: Provider
}

export interface NewsInformationResponse {
  value: NewsInformation[]
  didUMean: string
  relatedSearch: NewsInformation[]
  totalCount: number
  _type: string
}

export interface Provider {
  name: string
  favIcon: string
  favIconBase64Encoding: string
}

export interface NewsInformationImage {
  thumbnailHeight: number
  thumbnailWidth: number
  title: string | null
  url: string
  imageWebSearchUrl: string | null
  name: string | null
  provider: Provider
  thumbnail: string
  webpageUrl: string
  width: number
  base64Encoding: string
  height: number
}
