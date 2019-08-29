import React from 'react'
import Layout from '../components/layout'
import { RainbowProvider } from '../helpers/useRainbow'

function LayoutContainer(props) {
  return (
    <RainbowProvider>
      <Layout {...props} siteTitle={'QueerJS'} />
    </RainbowProvider>
  )
}

export default LayoutContainer
