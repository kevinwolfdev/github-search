import { AnimatePresence } from 'framer-motion'
import React from 'react'

import UsersIcon from '@components/icons/users'
import Message from '@components/message'
import SearchBar from '@components/search-bar'
import SearchResult from '@components/search-result'
import ShortcutsModal from '@components/shortcuts-modal'

const Home: React.FC = () => {
  const [query, setQuery] = React.useState('')

  return (
    <React.Fragment>
      <SearchBar value={query} onChange={setQuery} />
      <AnimatePresence exitBeforeEnter>
        {query ? (
          <SearchResult key={query} query={query} />
        ) : (
          <Message
            icon={UsersIcon}
            title="GitHub User Search"
            text="Your search results will appear here"
            extra={
              <div className="invisible md:visible mt-12 text-gray-500">
                Pro tip: press <kbd>?</kbd> to see keyboard shortcuts.
              </div>
            }
          />
        )}
      </AnimatePresence>
      <ShortcutsModal />
    </React.Fragment>
  )
}

export default Home
