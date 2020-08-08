import { motion } from 'framer-motion'
import React from 'react'

import { appearAnimation } from '@lib/animations'

type MessageProps = {
  illustration: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >
  title?: string
  text?: React.ReactNode
  extra?: React.ReactNode
}

const Message: React.FC<MessageProps> = ({
  illustration: Illustration,
  title,
  text,
  extra,
}) => {
  return (
    <motion.div
      {...appearAnimation}
      className="flex flex-col items-center my-auto text-center p-8"
    >
      <Illustration className="mx-auto w-full max-w-xs h-auto text-gray-500" />
      {title ? <h1 className="mt-8 text-4xl font-bold">{title}</h1> : null}
      {text ? (
        <p className="mt-4 text-xl md:text-2xl text-gray-600 w-full md:w-3/4">
          {text}
        </p>
      ) : null}
      {extra}
    </motion.div>
  )
}

export default Message
