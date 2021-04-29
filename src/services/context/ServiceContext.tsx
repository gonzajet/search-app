import React from 'react'
import axios from 'axios'

import { NewsInformationResponse } from '../../components/News/NewsInformation'
import { AxiosInstance } from 'axios'

export interface IServiceContext {
  children?: JSX.Element
  searchByQuery: (
    query: string,
    pageNumber: number,
    pageSize: number,
    withThumbnails?: boolean,
  ) => Promise<NewsInformationResponse | undefined>
}

interface IHeader {
  'x-rapidapi-key'?: string
  'x-rapidapi-host'?: string
}

export const ServiceContext: React.Context<IServiceContext> = React.createContext<IServiceContext>(undefined!)

export const ServiceContextProvider = (props: any) => {
  const baseURL: string = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/`
  const searchAPIText: string = `NewsSearchAPI`
  const headers: IHeader = {
    'x-rapidapi-key': 'e28105562fmsh01edebafeeb6117p1f37e7jsn0221a314ae3d',
    'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
  }

  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
  })

  /**
   * @param query
   * @param pageNumber 
   * @param pageSize
   * @param withThumbnails (optional) enable thumbnails
   */
  const newsSearch = (
    query: string,
    pageNumber: number,
    pageSize: number,
    withThumbnails: boolean = true
  ): Promise<NewsInformationResponse | undefined> => {
    async function getInformation(): Promise<NewsInformationResponse | undefined> {
      try {
        const response = await axiosInstance.get<NewsInformationResponse>(searchAPIText, {
          headers,
          params: {
            q: query,
            pageNumber,
            pageSize,
            withThumbnails,
          },
        })
        if (response.status === 200) {
          return response.data
        }
      } catch (error) {
        console.error(error)
      }
    }

    return getInformation()
  }

  const searchServiceProviderValue: IServiceContext = {
    searchByQuery: newsSearch,
  }

  return (
    <ServiceContext.Provider value={searchServiceProviderValue}>
      {props.children}
    </ServiceContext.Provider>
  )
}
