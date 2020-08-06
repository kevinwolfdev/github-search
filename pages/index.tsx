import React from 'react'

import SearchBar from '@components/search-bar'

const Home: React.FC = () => {
  const [search, setSearch] = React.useState('')

  return (
    <>
      <SearchBar value={search} onChange={setSearch} />
    </>
  )
}

export default Home
