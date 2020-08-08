import cx from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce/lib'

import {
  slideDownAnimation,
  ANIMATION_DURATION,
  appearAnimation,
} from '@lib/animations'
import { useShortcut, shortcuts } from '@lib/shortcuts'

import ClearIcon from './icons/clear'
import SearchIcon from './icons/search'

type SearchBarProps = {
  inline?: boolean
  value: string
  onChange: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ inline, value, onChange }) => {
  const ref = React.useRef<HTMLInputElement>(null)
  const [debouncedCallback] = useDebouncedCallback(onChange, 250)

  const handleClear = React.useCallback(() => {
    ref.current!.value = ''
    ref.current!.blur()
    onChange('')
  }, [onChange])

  React.useEffect(() => {
    if (inline) {
      ref.current!.focus()
    }
  }, [inline])

  useShortcut('clearSearch', handleClear)

  return (
    <motion.div
      {...(inline ? appearAnimation : slideDownAnimation)}
      className={cx(
        'sticky top-0 bg-white flex items-center z-10',
        inline && 'rounded-md'
      )}
    >
      <SearchIcon className="absolute left-4 text-gray-600" />
      <input
        ref={ref}
        type="text"
        defaultValue={value}
        placeholder="Search GitHub users..."
        className="w-full shadow-md bg-transparent p-4 pl-12 text-xl placeholder-gray-600 relative z-10"
        onChange={(e) => debouncedCallback(e.target.value)}
        onKeyUp={(e) => {
          e.preventDefault()

          if (e.key === shortcuts.clearSearch.key) {
            handleClear()
          }
        }}
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
