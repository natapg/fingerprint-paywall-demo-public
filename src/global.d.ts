/// <reference types="./gatsby-types" />

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.webm'
declare module '*.mp4'
declare module '*.mov' {
  const src: string
  export default src
}
