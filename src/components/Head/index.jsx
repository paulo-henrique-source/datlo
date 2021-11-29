import React from 'react'
import NextHead from 'next/head'

const Head = ({ title }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </NextHead>
  )
}

export default Head
