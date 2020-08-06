import { AnimatePresence } from 'framer-motion'
import React from 'react'
import useSWR from 'swr'

import Pagination from '@components/pagination'
import SearchBar from '@components/search-bar'
import SearchPlaceholder from '@components/search-placeholder'
import SearchResults from '@components/search-results'
import { searchUsers, SearchUsersResult } from '@lib/api'

const Home: React.FC = () => {
  const [query, setQuery] = React.useState('')
  const [perPage, setPerPage] = React.useState(10)
  const [page, setPage] = React.useState(1)

  const { data, error, isValidating, revalidate } = useSWR(
    query ? [query, perPage, page] : null,
    searchUsers,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  // This is a little trick I implemented to avoid hidding the
  // pagination bar while switching pages and showing it when the API
  // returned an error.
  const pagination = usePersistedPagination(query, data)

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

  return (
    <>
      <SearchBar value={query} onChange={setQuery} />
      <AnimatePresence exitBeforeEnter>
        {query ? (
          <React.Fragment key="results">
            <SearchResults
              key="results"
              isLoading={isLoading}
              error={error?.message}
              data={data}
              revalidate={revalidate}
            />
            {pagination !== undefined ? (
              <Pagination
                {...pagination}
                isLoading={isLoading}
                page={page}
                perPage={perPage}
                setPerPage={setPerPage}
                setPage={setPage}
              />
            ) : null}
          </React.Fragment>
        ) : (
          <SearchPlaceholder key="placeholder" />
        )}
      </AnimatePresence>
    </>
  )
}

const usePersistedPagination = (query: string, data?: SearchUsersResult) => {
  const [prevData, setPrevData] = React.useState<SearchUsersResult>()

  React.useEffect(() => {
    if (data) setPrevData(data)
  }, [data])

  return prevData?.pagination
}

export default Home
