import React from 'react'

export const shortcuts = {
  help: {
    label: '?',
    key: '?',
    description: 'Show / hide help modal',
  },
  clearSearch: {
    label: 'ESC',
    key: 'Escape',
    description: 'Clear search',
  },
  initialPage: {
    label: '↑',
    key: 'ArrowUp',
    description: 'Go to initial page',
  },

  nextPage: {
    label: '→',
    key: 'ArrowRight',
    description: 'Go to next page',
  },
  finalPage: {
    label: '↓',
    key: 'ArrowDown',
    description: 'Go to final page',
  },
  previousPage: {
    label: '←',
    key: 'ArrowLeft',
    description: 'Go to previous page',
  },
}

export const useShortcut = (
  shortcut: keyof typeof shortcuts,
  callback: () => void
) => {
  React.useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      console.log(e)
      if (!e.defaultPrevented && e.key === shortcuts[shortcut].key) {
        e.preventDefault()
        callback()
      }
    }

    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [callback, shortcut])
}
