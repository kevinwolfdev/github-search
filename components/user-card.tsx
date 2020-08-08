import cx from 'classnames'
import { motion } from 'framer-motion'
import moment from 'moment'
import React from 'react'
import useSWR from 'swr'

import { appearAnimation, slideRightAnimation } from '@lib/animations'
import { getUser } from '@lib/api'
import { formatNumber } from '@lib/utils'

import CalendarIcon from './icons/calendar'
import CodeIcon from './icons/code'
import FollowersIcon from './icons/followers'
import RefreshIcon from './icons/refresh'

type UserCardProps = {
  i: number
  login?: string
  avatarUrl?: string
}

const UserCard: React.FC<UserCardProps> = ({ i, login, avatarUrl }) => {
  const isLoadingAvatar = useImageLoader(avatarUrl)

  const isPlaceholder = React.useMemo(() => !login && !avatarUrl, [
    avatarUrl,
    login,
  ])

  const { data, error, isValidating, revalidate } = useSWR(
    login ?? null,
    getUser,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  const isLoading = React.useMemo(
    () => isPlaceholder || data === undefined || error,
    [data, error, isPlaceholder]
  )

  return (
    <motion.a
      custom={i}
      initial="initial"
      animate="visible"
      exit="hidden"
      variants={{
        initial: (isPlaceholder ? appearAnimation : slideRightAnimation)
          .initial,
        visible: (i: number) => ({
          ...(isPlaceholder ? appearAnimation : slideRightAnimation).animate,
          transition: {
            ...(isPlaceholder ? appearAnimation : slideRightAnimation)
              .transition,
            delay: isPlaceholder ? 1 : i * 0.1,
          },
        }),
        hidden: {
          ...(isPlaceholder ? appearAnimation : slideRightAnimation).exit,
          transition: {
            ...(isPlaceholder ? appearAnimation : slideRightAnimation)
              .transition,
          },
        },
      }}
      className={cx(
        'relative my-4 bg-white rounded-lg shadow-sm p-8 flex flex-col md:flex-row items-center text-center md:text-left',
        login && ' hover:shadow-lg transition-shadow duration-200 ease-in-out'
      )}
      href={login ? `https://github.com/${login}` : undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className={cx(
          'skeleton flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full',
          (isPlaceholder || isLoadingAvatar) && 'skeleton-active'
        )}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${login} profile picture`}
            className="w-full h-full"
          />
        ) : null}
      </div>

      <div className="mt-4 md:mt-0 md:ml-8 w-full flex flex-col items-center md:items-start min-w-0">
        <h2
          className={cx(
            'skeleton text-2xl font-bold leading-tight',
            isPlaceholder && 'skeleton-active h-leading-tight w-6/12 md:w-2/12'
          )}
        >
          {login}
        </h2>

        {!error || data ? (
          <div className="w-full flex flex-col items-center md:items-start">
            <h3
              className={cx(
                'mt-2 skeleton text-xl leading-tight truncate md:w-3/12',
                isLoading && 'skeleton-active h-leading-tight w-8/12 '
              )}
            >
              {data?.name ?? <React.Fragment>&nbsp;</React.Fragment>}
            </h3>

            <div className="w-full mt-4 flex flex-col items-center md:items-start">
              <Stat
                isLoading={isLoading}
                icon={CodeIcon}
                label={formatNumber(data?.public_repos ?? 0, 'repo')}
              />
              <Stat
                isLoading={isLoading}
                icon={FollowersIcon}
                label={formatNumber(data?.followers ?? 0, 'follower')}
              />
              <Stat
                isLoading={isLoading}
                icon={CalendarIcon}
                label={`Joined ${
                  data?.created_at
                    ? moment(data.created_at).format('MMM YYYY')
                    : null
                }`}
              />
            </div>
          </div>
        ) : (
          <div className="mt-4 text-gray-600 text-sm">
            Error fetching user data: {error.message}
          </div>
        )}
      </div>

      {error && !isValidating ? (
        <button
          type="button"
          className="absolute top-4 right-4 text-blue-500"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            revalidate()
          }}
        >
          <RefreshIcon />
        </button>
      ) : null}
    </motion.a>
  )
}

const useImageLoader = (src?: string) => {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (src) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setIsLoading(false)
      }
    }
  }, [src])

  return isLoading
}

type StatProps = {
  isLoading: boolean
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >
  label: React.ReactNode
}

const Stat: React.FC<StatProps> = ({ isLoading, icon: Icon, label }) => {
  return (
    <div
      className={cx(
        'skeleton mt-2 flex items-center text-sm text-gray-600',
        isLoading && 'skeleton-active w-6/12 md:w-2/12'
      )}
    >
      <Icon className="text-blue-500 mr-2" />
      {label}
    </div>
  )
}

export default UserCard
