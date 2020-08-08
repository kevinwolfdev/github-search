import React from 'react'

export const parseResponseLinks = (
  header: string | null
): Record<string, string> =>
  header
    ? header.split(', ').reduce((acc, curr) => {
        const [rawLink, rawRel] = curr.split('; ')
        const rel = rawRel.match(/"(.*?)"/)?.[1]
        const link = rawLink.match(/<(.*)>/)?.[1]

        if (!rel || !link) {
          throw new Error(`Error trying to parse ${curr}`)
        }

        return { ...acc, [rel]: link }
      }, {})
    : {}

const range = (from: number, to: number, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }

  return range
}

export const buildPagination = (currentPage: number, totalPages: number) => {
  const pageNeighbours = 1

  const totalNumbers = pageNeighbours * 2 + 3
  const totalBlocks = totalNumbers + 2

  if (totalPages > totalBlocks) {
    let pages = []

    const leftBound = currentPage - pageNeighbours
    const rightBound = currentPage + pageNeighbours
    const beforeLastPage = totalPages - 1

    const startPage = leftBound > 2 ? leftBound : 2
    const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage

    pages = range(startPage, endPage)

    const pagesCount = pages.length
    const singleSpillOffset = totalNumbers - pagesCount - 1

    const leftSpill = startPage > 2
    const rightSpill = endPage < beforeLastPage

    if (leftSpill && !rightSpill) {
      const extraPages = range(startPage - singleSpillOffset, startPage - 1)
      pages = [null, ...extraPages, ...pages]
    } else if (!leftSpill && rightSpill) {
      const extraPages = range(endPage + 1, endPage + singleSpillOffset)
      pages = [...pages, ...extraPages, null]
    } else if (leftSpill && rightSpill) {
      pages = [null, ...pages, null]
    }

    return [1, ...pages, totalPages]
  }

  return range(1, totalPages)
}

export const formatNumber = (value: number, text: string) => (
  <span>
    <strong>{value.toLocaleString()}</strong> {value === 1 ? text : `${text}s`}
  </span>
)
