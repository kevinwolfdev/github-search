import { AnimatePresence } from 'framer-motion'
import React from 'react'

import UsersIllustration from '@components/illustrations/users'
import Message from '@components/message'
import SearchBar from '@components/search-bar'
import SearchResult from '@components/search-result'
import ShortcutsModal from '@components/shortcuts-modal'

const Home: React.FC = () => {
  const [query, setQuery] = React.useState('')

  return (
    <React.Fragment>
      <AnimatePresence exitBeforeEnter>
        {query ? (
          <React.Fragment key={query}>
            <SearchBar value={query} onChange={setQuery} />
            <SearchResult query={query} />
          </React.Fragment>
        ) : (
          <Message
            illustration={UsersIllustration}
            extra={
              <div className="mt-12">
                <SearchBar inline value={query} onChange={setQuery} />
                <div className="invisible md:visible mt-12 text-gray-500">
                  Pro tip: press <kbd>?</kbd> to see keyboard shortcuts.
                </div>
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
