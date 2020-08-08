import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce/lib'

import {
  slideDownAnimation,
  ANIMATION_DURATION,
  appearAnimation,
} from '@lib/animations'

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
      {...{
        ...slideDownAnimation,
        transition: {
          ...slideDownAnimation.transition,
          delay: ANIMATION_DURATION,
        },
      }}
      className="sticky top-0 bg-white flex items-center z-10"
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
            {...appearAnimation}
            type="button"
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
