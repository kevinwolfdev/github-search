import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import useSWR from 'swr'

import { appearAnimation } from '@lib/animations'
import { search, Search } from '@lib/api'

import ErrorIcon from './icons/error'
import Message from './message'
import Pagination from './pagination'
import UsersList from './users-list'

type SearchResultsProps = {
  query: string
}

const SearchResult: React.FC<SearchResultsProps> = ({ query }) => {
  const [perPage, setPerPage] = React.useState(10)
  const [page, setPage] = React.useState(1)

  const { data, error, isValidating, revalidate } = useSWR(
    query ? [query, perPage, page] : null,
    search,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  // Loading state.
  const isLoading = React.useMemo(
    () =>
      (data === undefined && !error) ||
      (data === undefined && error && isValidating),
    [data, error, isValidating]
  )

  // Reset page when query changes
  React.useEffect(() => {
    setPage(1)
  }, [query])

  // Scroll to top when something changes
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [query, perPage, page])

  // This is a little trick I implemented to avoid hidding the
  // pagination bar while switching pages and showing it when the API
  // returned an error.
  const pagination = usePersistedPagination(query, data)

  // Track UI state for proper animations.
  const state = React.useMemo(() => {
    if (isLoading) return 'loading'
    if (error && !data) return 'error'
    return 'data'
  }, [data, error, isLoading])

  // Generate key for animated items. On this way, switching
  // between pages with data already fetched will be smoother.
  const key = React.useMemo(() => {
    if (data) return `data-${JSON.stringify(data.users)}`
    return state
  }, [data, state])

  return (
    <React.Fragment>
      <motion.main
        {...appearAnimation}
        className="container mx-auto py-8 flex flex-col flex-auto"
      >
        <AnimatePresence exitBeforeEnter>
          <React.Fragment key={key}>
            {state === 'loading' ? <UsersList length={perPage} /> : null}

            {state === 'error' ? (
              <Message
                icon={ErrorIcon}
                title="Whoops!"
                text={`Error fetching search results: ${error.message}`}
                extra={
                  <button
                    type="button"
                    className="mt-8 bg-blue-500 hover:bg-blue-700 transition-colors duration-200 ease-in-out text-white px-4 py-2 rounded-md"
                    onClick={revalidate}
                  >
                    Retry
                  </button>
                }
              />
            ) : null}

            {state === 'data' ? <UsersList data={data?.users} /> : null}
          </React.Fragment>
        </AnimatePresence>
      </motion.main>

      {pagination !== undefined ? (
        <Pagination
          {...pagination}
          page={page}
          perPage={perPage}
          setPerPage={setPerPage}
          setPage={setPage}
        />
      ) : null}
    </React.Fragment>
  )
}

const usePersistedPagination = (query: string, data?: Search) => {
  const [prevData, setPrevData] = React.useState<Search>()

  React.useEffect(() => {
    if (data) setPrevData(data)
  }, [data])

  return prevData?.pagination
}

export default SearchResult
