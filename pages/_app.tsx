import { AppProps } from 'next/app'
import Head from 'next/head'

import '@styles/main.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>GitHub Search</title>
        <meta
          name="description"
          content="Search for GitHub users using GitHub Search API on top of Next.js, TailwindCSS and SWR"
        />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default App
