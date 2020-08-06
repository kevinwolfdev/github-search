import moment from 'moment'

import { parseResponseLinks } from './utils'

const API_ENDPOINT = 'https://api.github.com'

export type SearchUsersResult = {
  users: { login: string; avatar_url: string }[]
  pagination: {
    totalPages: number
    totalCount: number
  }
}

export const searchUsers = async (
  query: string,
  perPage: number,
  page: number
): Promise<SearchUsersResult> => {
  const rateRes = await fetch(`${API_ENDPOINT}/rate_limit`)
  const rateData = await rateRes.json()

  if (rateData.resources.search.remaining === 0) {
    const currentTime = moment()
    const enabledTime = moment(rateData.resources.search.reset * 1000)
    let message = 'GitHub Search API quota exceeded, please try again'

    if (enabledTime.isAfter(currentTime)) {
      message += ` ${enabledTime.from(currentTime)}`
    }
    throw new Error(message)
  }

  const url = `${API_ENDPOINT}/search/users?q=${query}&per_page=${perPage}&page=${page}`
  const searchRes = await fetch(url)
  const searchData = await searchRes.json()

  const links = parseResponseLinks(searchRes.headers.get('link'))
  const lastPage = links.last?.match(/&page=(.*)/)?.[1]

  return {
    users: searchData.items,
    pagination: {
      totalPages: lastPage ? parseInt(lastPage) : page,
      totalCount: searchData.total_count,
    },
  }
}
