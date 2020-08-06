import { motion } from 'framer-motion'
import React from 'react'

import UsersIcon from './icons/users'

const SearchPlaceholder: React.FC = () => {
  return (
    <motion.div
      className="container m-auto text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <UsersIcon className="mx-auto w-24 h-24 text-gray-500" />
      <h1 className="mt-8 text-4xl font-bold">GitHub User Search</h1>
      <p className="mt-4 text-xl md:text-2xl text-gray-600">
        Your search results will appear here
      </p>
    </motion.div>
  )
}

export default SearchPlaceholder
