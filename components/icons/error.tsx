import React from 'react'

const ErrorIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, svgRef) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M12.5 23C6.701 23 2 18.299 2 12.5S6.701 2 12.5 2 23 6.701 23 12.5 18.299 23 12.5 23zm0-1a9.5 9.5 0 100-19 9.5 9.5 0 000 19zm.5-9.5a.5.5 0 11-1 0v-4a.5.5 0 111 0v4zM12 15h1v1h-1v-1z"
      />
    </svg>
  )
})

ErrorIcon.displayName = 'ErrorIcon'

export default ErrorIcon
