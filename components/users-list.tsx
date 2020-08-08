import { motion } from 'framer-motion'
import React from 'react'

import { appearAnimation } from '@lib/animations'
import { Search } from '@lib/api'

import UserCard from './user-card'

type UsersListProps = {
  length?: number
  data?: Search['users']
}

const UsersList: React.FC<UsersListProps> = ({ length = 0, data }) => {
  return (
    <motion.div {...appearAnimation}>
      {data
        ? data.map((user, i) => (
            <UserCard
              key={user.login}
              i={i}
              login={user.login}
              avatarUrl={user.avatar_url}
            />
          ))
        : Array.from({ length }).map((_x, i) => (
            <UserCard key={`skeleton-${i}`} i={i} />
          ))}
    </motion.div>
  )
}

export default UsersList
