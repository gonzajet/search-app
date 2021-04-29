import React from 'react'
import axios from 'axios'

import { NewsInformationResponse } from '../../components/News/NewsInformation'
import { AxiosInstance } from 'axios'

export interface ISearchServiceContext {
  children?: JSX.Element
  searchByQuery: (
    query: string,
    pageNumber: number,
    pageSize: number,
    withThumbnails?: boolean,
    safeSearch?: boolean
  ) => Promise<NewsInformationResponse | undefined>
}

interface ICustomHeaders {
  'x-rapidapi-key'?: string
  'x-rapidapi-host'?: string
}

export const SearchServiceContext: React.Context<ISearchServiceContext> = React.createContext<ISearchServiceContext>(
  undefined!
)

export const SeearchServiceContextProvider = (props: any) => {
  const baseURL: string = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/`
  const searchAPI: string = `NewsSearchAPI`
  const headers: ICustomHeaders = {
    'x-rapidapi-key': 'e28105562fmsh01edebafeeb6117p1f37e7jsn0221a314ae3d',
    'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
  }

  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
  })

  /**
   * Obtains all the news based on a given/provided filter.
   * @param query query filter
   * @param pageNumber page number
   * @param pageSize page size
   * @param withThumbnails (optional) include thumbnails
   * @param safeSearch (optional) include adult content
   */
  const newsSearch = (
    query: string,
    pageNumber: number,
    pageSize: number,
    withThumbnails: boolean = true,
    safeSearch: boolean = false
  ): Promise<NewsInformationResponse | undefined> => {
    async function getInformation(): Promise<NewsInformationResponse | undefined> {
      try {
        const response = await axiosInstance.get<NewsInformationResponse>(searchAPI, {
          headers,
          params: {
            q: query,
            pageNumber,
            pageSize,
            withThumbnails,
            safeSearch,
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

  const searchServiceProviderValue: ISearchServiceContext = {
    searchByQuery: newsSearch,
  }

  return (
    <SearchServiceContext.Provider value={searchServiceProviderValue}>
      {props.children}
    </SearchServiceContext.Provider>
  )
}
