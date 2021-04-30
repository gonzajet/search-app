export interface NewsInformationResponse {
  didUMean: string
  relatedSearch: NewsInformation[]
  value: NewsInformation[]
  totalCount: number
  _type: string
}

export interface NewsInformation {
  body: string
  datePublished: string
  description: string
  id: string
  image: NewsInformationImage
  isSafe: boolean
  keywords: string
  language: string
  provider: Provider
  snippet: string;
  title: string
  url: string
}

export interface NewsInformationImage {
  base64Encoding: string
  height: number
  imageWebSearchUrl: string | null
  name: string | null
  provider: Provider
  thumbnail: string
  thumbnailHeight: number
  thumbnailWidth: number
  title: string | null
  url: string
  webpageUrl: string
  width: number
}

export interface Provider {
  favIcon: string
  favIconBase64Encoding: string
  name: string
}
