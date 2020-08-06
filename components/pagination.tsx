import cx from 'classnames'
import { motion } from 'framer-motion'
import React from 'react'

import { SearchUsersResult } from '@lib/api'
import { buildPagination } from '@lib/utils'

import MoreIcon from './icons/more'
import NextPageIcon from './icons/next-page'
import PrevPageIcon from './icons/prev-page'

type PaginationProps = SearchUsersResult['pagination'] & {
  isLoading: boolean
  page: number
  perPage: number
  setPerPage: (value: number) => void
  setPage: (value: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  isLoading,
  page,
  perPage,
  totalPages,
  setPerPage,
  setPage,
}) => {
  const pages = React.useMemo(() => buildPagination(page, totalPages), [
    page,
    totalPages,
  ])

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.25 }}
      className="mt-auto sticky bottom-0 bg-white px-4 py-8 flex flex-col md:flex-row items-center md:justify-between shadow-md text-gray-600"
    >
      <div
        className={cx(
          'transition-opacity duration-200 ease-in-out',
          isLoading && true && 'opacity-50 pointer-events-none'
        )}
      >
        Page size
        <select
          value={perPage}
          className="ml-4 border border-grey-400 hover:border-blue-400 cursor-pointer rounded-md p-2 bg-white"
          onChange={(e) => setPerPage(parseInt(e.target.value, 10))}
        >
          {[5, 10, 15, 25, 50, 100].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <motion.div
        layout
        className={cx(
          'my-4 flex items-center transition-opacity duration-200 ease-in-out',
          isLoading && true && 'opacity-50 pointer-events-none'
        )}
      >
        <motion.button
          layout
          type="button"
          className={cx(
            'transition-opacity duration-200 ease-in-out',
            page === 1 && 'opacity-0'
          )}
          onClick={() => setPage(page - 1)}
        >
          <PrevPageIcon />
        </motion.button>
        {pages.map((p, i) =>
          p ? (
            <motion.button
              layout
              key={`${p}-${i}`}
              className={cx(
                'mx-1 border border-grey-400 hover:border-blue-300 w-10 h-10 rounded-full flex items-center justify-center text-sm leading-none',
                p === page && 'border-blue-400'
              )}
              onClick={() => setPage(p)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {p}
            </motion.button>
          ) : (
            <MoreIcon key={`${p}-${i}`} className="text-gray-400" />
          )
        )}
        <motion.button
          layout
          type="button"
          className={cx(
            'transition-opacity duration-200 ease-in-out',
            page === totalPages && 'opacity-0'
          )}
          onClick={() => setPage(page + 1)}
        >
          <NextPageIcon />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default Pagination
