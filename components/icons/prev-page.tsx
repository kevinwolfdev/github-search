import React from 'react'

const PrevPageIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, svgRef) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M13.88 15.175a.5.5 0 01-.76.65l-3-3.5a.5.5 0 010-.65l3-3.5a.5.5 0 01.76.65L11.159 12l2.72 3.175z"
      />
    </svg>
  )
})

PrevPageIcon.displayName = 'PrevPageIcon'

export default PrevPageIcon
