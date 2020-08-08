import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import useSWR from 'swr'

import { appearAnimation } from '@lib/animations'
import { search, Search } from '@lib/api'

import EmptyIllustration from './illustrations/empty'
import TimeoutIllustration from './illustrations/timeout'
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
  const persistedData = usePersistedData(data)

  // Track UI state for proper animations.
  const state = React.useMemo(() => {
    if (isLoading) return 'loading'
    if (error && !data) return 'error'
    if (data && data.users.length === 0) return 'empty'
    return 'data'
  }, [data, error, isLoading])

  // Generate key for animated items. On this way, switching
  // between pages with data already fetched will be smoother.
  const key = React.useMemo(() => {
    if (state === 'data' && data) return `data-${JSON.stringify(data.users)}`
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
                illustration={TimeoutIllustration}
                title="Whoops!"
                text={`Error fetching search results: ${error.message}`}
                extra={
                  <button
                    type="button"
                    className="mt-8 button"
                    onClick={revalidate}
                  >
                    Retry
                  </button>
                }
              />
            ) : null}

            {state === 'empty' ? (
              <Message
                illustration={EmptyIllustration}
                title="No results"
                text={
                  <React.Fragment>
                    Looks like there are no results for <strong>{query}</strong>
                    <br />
                    Wanna give it another shot?
                  </React.Fragment>
                }
              />
            ) : null}

            {state === 'data' ? <UsersList data={data?.users} /> : null}
          </React.Fragment>
        </AnimatePresence>
      </motion.main>

      {persistedData && persistedData.users.length ? (
        <Pagination
          {...persistedData.pagination}
          page={page}
          perPage={perPage}
          setPerPage={setPerPage}
          setPage={setPage}
        />
      ) : null}
    </React.Fragment>
  )
}

const usePersistedData = (data?: Search) => {
  const [prevData, setPrevData] = React.useState<Search>()

  React.useEffect(() => {
    if (data) setPrevData(data)
  }, [data])

  return prevData
}

export default SearchResult
