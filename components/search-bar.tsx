import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce/lib'

import ClearIcon from './icons/clear'
import SearchIcon from './icons/search'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const ref = React.useRef<HTMLInputElement>(null)
  const [debouncedCallback] = useDebouncedCallback(onChange, 250)

  React.useEffect(() => {
    ref.current?.focus()
  }, [])

  const handleClear = React.useCallback(() => {
    ref.current!.value = ''
    ref.current!.focus()
    onChange('')
  }, [onChange])

  return (
    <motion.div
      layout
      className="sticky top-0 bg-white flex items-center"
      initial={{ opacity: 0, y: -62 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.25 }}
    >
      <SearchIcon className="absolute left-4 text-gray-600" />
      <input
        ref={ref}
        type="text"
        defaultValue={value}
        placeholder="Search..."
        className="w-full shadow-md bg-transparent p-4 pl-12 text-xl placeholder-gray-600 relative z-10"
        onChange={(e) => debouncedCallback(e.target.value)}
      />
      <AnimatePresence>
        {value ? (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute right-4 z-20"
            onClick={handleClear}
          >
            <ClearIcon className="text-red-500" />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

export default SearchBar
