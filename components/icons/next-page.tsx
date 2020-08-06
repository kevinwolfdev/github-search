import React from 'react'

const NextPageIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, svgRef) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M12.841 12l-2.72-3.175a.5.5 0 11.759-.65l3 3.5a.5.5 0 010 .65l-3 3.5a.5.5 0 01-.76-.65L12.841 12z"
      />
    </svg>
  )
})

NextPageIcon.displayName = 'NextPageIcon'

export default NextPageIcon
