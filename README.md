# 🔎 GitHub User Search

GitHub user search web application.

## Tech stack

- [Next.js](https://nextjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel](https://vercel.com)

## Development workflow

### Clone this repo

```bash
gh repo clone kevinwolfdev/github-user-search
```

### Install dependencies

```bash
yarn install
```

### Start the dev server

```bash
yarn dev
```

## Highlights

- 📱 Mobile-first.
- 🤩 Delightful animations and illustrations from [Undraw](https://undraw.co).
- ♻️ Debounced search to avoid exceeding the
  [GitHub Public API Rate Limit](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting).
- 🚀 Progressively enhanced. When the GitHub Public API Rate Limit is exceeded,
  the UI will keep functional, enabling the user to navigate through cached
  data.
- 📖 Pagination
- 💀 Loading state skeletons using a delayed appear animation to avoid flashing
  them on fast connections.
- ✨ Keyboard shortcuts

## Notes

1. An API call to the
   [rate_limit](https://docs.github.com/en/rest/reference/rate-limit) endpoint
   is made before each call to GitHub API to ensure we won't receive an error
   (`app -> rate_limit -> endpoint`).
2. A solution to avoid reaching API limits could have been to generate a
   personal access token and send it through the `Authorization` header,
   however, this has some caveats:
   1. The token will eventually expire, rendering the application useless.
   2. A proxy lambda function should be created to expose my access token to
      external users, this will add an extra HTTP call
      (`app -> proxy -> rate_limit -> endpoint`)
3. While this is a Single Page Application, I still choose Next.js because of
   the performance optimizations and tooling I get out-of-the-box, such as:
   1. Static generation of routes (an HTML is downloaded with styles included so
      the page is visible even when all assets have not been downloaded)
   2. Code splitting
   3. TypeScript support
   4. PostCSS support (TailwindCSS uses PostCSS and purges unused styles)
