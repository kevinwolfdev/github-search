import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

import '@styles/main.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Head>
        <title>GitHub User Search</title>
        <meta
          name="description"
          content="Search for GitHub users using GitHub Search API on top of Next.js, TailwindCSS and SWR"
        />
      </Head>

      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default App
