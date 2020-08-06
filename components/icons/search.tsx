import React from 'react'

const SearchIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, svgRef) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M17 16.292l3.854 3.854a.5.5 0 01-.708.708l-3.854-3.855a8 8 0 11.707-.707zM11 18a7 7 0 100-14 7 7 0 000 14z"
      />
    </svg>
  )
})

SearchIcon.displayName = 'SearchIcon'

export default SearchIcon
