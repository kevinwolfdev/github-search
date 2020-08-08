import moment from 'moment'

import { parseResponseLinks } from './utils'

const API_ENDPOINT = 'https://api.github.com'

const validateRateLimit = async (resource: string, window: string) => {
  const res = await fetch(`${API_ENDPOINT}/rate_limit`)
  const data = await res.json()

  const { remaining, limit, reset } = data.resources[resource]

  if (remaining === 0) {
    const currentTime = moment()
    const enabledTime = moment(reset * 1000)
    let message = `GitHub ${resource} API rate limit of ${limit} requests per ${window} exceeded. Please try again`

    if (enabledTime.isAfter(currentTime)) {
      message += ` ${enabledTime.from(currentTime)}.`
    }

    throw new Error(message)
  }
}

export type Search = {
  users: { login: string; avatar_url: string }[]
  pagination: {
    totalPages: number
    totalCount: number
  }
}

export const search = async (
  query: string,
  perPage: number,
  page: number
): Promise<Search> => {
  await validateRateLimit('search', 'minute')

  const res = await fetch(
    `${API_ENDPOINT}/search/users?q=${query}&per_page=${perPage}&page=${page}`
  )

  const data = await res.json()
  const links = parseResponseLinks(res.headers.get('link'))
  const lastPage = links.last?.match(/&page=(.*)/)?.[1]

  return {
    users: data.items,
    pagination: {
      totalPages: lastPage ? parseInt(lastPage) : page,
      totalCount: data.total_count,
    },
  }
}

export type GetUser = {
  name: string
  public_repos: number
  followers: number
  created_at: Date
}

export const getUser = async (login: string): Promise<GetUser> => {
  await validateRateLimit('core', 'hour')
  const res = await fetch(`${API_ENDPOINT}/users/${login}`)
  return res.json()
}
