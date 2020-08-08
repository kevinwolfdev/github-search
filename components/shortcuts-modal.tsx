import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import { appearAnimation, slideUpAnimation } from '@lib/animations'
import { useShortcut, shortcuts } from '@lib/shortcuts'

const ShortcutsModal: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleToggle = React.useCallback(() => {
    setIsOpen((o) => !o)
  }, [])

  useShortcut('help', handleToggle)

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          {...appearAnimation}
          className="fixed bg-whiteish top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center"
        >
          <motion.div
            {...slideUpAnimation}
            className="w-full max-w-screen-sm bg-white shadow-lg rounded-lg p-12"
          >
            <h2 className="text-2xl font-bold text-center">
              Keyboard Shortcuts
            </h2>

            <ul className="mt-16 grid grid-cols-2 col-gap-16 row-gap-6">
              {Object.entries(shortcuts).map(([type, shortcut]) => (
                <li
                  key={type}
                  className="text-gray-600 text-sm flex items-center flex-no-wrap"
                >
                  <div className="w-3/12">
                    <kbd>{shortcut.label}</kbd>
                  </div>
                  {shortcut.description}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default ShortcutsModal
