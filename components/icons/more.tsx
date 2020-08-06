import React from 'react'

const MoreIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, svgRef) => {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" ref={svgRef} {...props}>
        <path
          fill="currentColor"
          d="M19 11.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1zm1 0v1a1.5 1.5 0 01-1.5 1.5h-1a1.5 1.5 0 01-1.5-1.5v-1a1.5 1.5 0 011.5-1.5h1a1.5 1.5 0 011.5 1.5zm-7 0a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1zm1 0v1a1.5 1.5 0 01-1.5 1.5h-1a1.5 1.5 0 01-1.5-1.5v-1a1.5 1.5 0 011.5-1.5h1a1.5 1.5 0 011.5 1.5zm-7 0a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1zm1 0v1A1.5 1.5 0 016.5 14h-1A1.5 1.5 0 014 12.5v-1A1.5 1.5 0 015.5 10h1A1.5 1.5 0 018 11.5z"
        />
      </svg>
    )
  }
)

MoreIcon.displayName = 'MoreIcon'

export default MoreIcon
