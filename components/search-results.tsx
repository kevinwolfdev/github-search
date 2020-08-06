import { motion } from 'framer-motion'
import React from 'react'

import { SearchUsersResult } from '@lib/api'

import ErrorIcon from './icons/error'

type SearchResultsProps = {
  isLoading: boolean
  error?: string
  data?: SearchUsersResult
  revalidate: () => void
}

const SearchResults: React.FC<SearchResultsProps> = ({
  isLoading,
  error,
  data,
  revalidate,
}) => {
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error && !data) {
    return (
      <motion.div
        className="container m-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <ErrorIcon className="mx-auto w-24 h-24 text-gray-500" />
        <h1 className="mt-8 text-4xl font-bold">Whoops!</h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-600">{error}</p>
        <button
          type="button"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={revalidate}
        >
          Retry
        </button>
      </motion.div>
    )
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default SearchResults
