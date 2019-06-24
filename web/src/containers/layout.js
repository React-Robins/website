import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import { RainbowProvider } from '../helpers/useRainbow'

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }
  }
`

function LayoutContainer(props) {
  return (
    <RainbowProvider>
      <StaticQuery
        query={query}
        render={data => {
          return <Layout {...props} siteTitle={data.site.title} />
        }}
      />
    </RainbowProvider>
  )
}

export default LayoutContainer
