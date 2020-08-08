import { motion } from 'framer-motion'
import React from 'react'

import { appearAnimation } from '@lib/animations'

type MessageProps = {
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >
  title: string
  text: React.ReactNode
  extra?: React.ReactNode
}

const Message: React.FC<MessageProps> = ({
  icon: Icon,
  title,
  text,
  extra,
}) => {
  return (
    <motion.div
      {...appearAnimation}
      className="flex flex-col items-center my-auto text-center"
    >
      <Icon className="mx-auto w-24 h-24 text-gray-500" />
      <h1 className="mt-8 text-4xl font-bold">{title}</h1>
      <p className="mt-4 text-xl md:text-2xl text-gray-600 w-full md:w-3/4">
        {text}
      </p>
      {extra}
    </motion.div>
  )
}

export default Message
