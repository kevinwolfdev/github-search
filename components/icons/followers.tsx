import React from 'react'

const FollowersIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, svgRef) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" ref={svgRef} {...props}>
      <path
        fill="currentColor"
        d="M19.293 19l-2.147-2.146a.5.5 0 01.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L19.293 20H14.5a.5.5 0 110-1h4.793zm-5.25-5.435A4.982 4.982 0 0112 14a4.982 4.982 0 01-2.039-.433L5.88 15.422A1.5 1.5 0 005 16.788v.712A1.5 1.5 0 006.5 19h5a.5.5 0 110 1h-5A2.5 2.5 0 014 17.5v-.712a2.5 2.5 0 011.465-2.276l3.457-1.571a5 5 0 116.172-.013l2.603 1.112a.5.5 0 01-.394.92l-3.26-1.395zM12 13a4 4 0 100-8 4 4 0 000 8z"
      />
    </svg>
  )
})

FollowersIcon.displayName = 'FollowersIcon'

export default FollowersIcon
