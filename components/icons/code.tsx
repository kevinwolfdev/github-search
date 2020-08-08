import React from 'react'

const CodeIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, svgRef) => {
    return (
      <svg width={24} height={24} viewBox="0 0 24 24" ref={svgRef} {...props}>
        <path
          fill="currentColor"
          d="M7.88 13.175a.5.5 0 01-.76.65l-3-3.5a.5.5 0 010-.65l3-3.5a.5.5 0 11.76.65L5.159 10l2.72 3.175zm1.073 6.536a.5.5 0 11-.906-.422l7-15a.5.5 0 01.906.422l-7 15zm7.167-8.886a.5.5 0 01.76-.65l3 3.5a.5.5 0 010 .65l-3 3.5a.5.5 0 01-.76-.65L18.841 14l-2.72-3.175z"
        />
      </svg>
    )
  }
)

CodeIcon.displayName = 'CodeIcon'

export default CodeIcon
