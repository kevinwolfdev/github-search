import React from 'react'

const RefreshIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, svgRef) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M17 18.246a8 8 0 00-4.505-14.23.5.5 0 11.061-1C17.29 3.307 21 7.237 21 12a8.986 8.986 0 01-3.342 7H20.5a.5.5 0 110 1h-4a.5.5 0 01-.5-.5v-4a.5.5 0 111 0v2.746zM7 5.754a8 8 0 004.54 14.233.5.5 0 01-.056.998C6.734 20.717 3 16.778 3 12a8.986 8.986 0 013.342-7H3.5a.5.5 0 010-1h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V5.754z"
      />
    </svg>
  )
})

RefreshIcon.displayName = 'RefreshIcon'

export default RefreshIcon
