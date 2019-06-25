import React from 'react'
import Img from 'gatsby-image'
import { getFluidGatsbyImage } from 'gatsby-source-sanity'

const config = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID || 'atggkqis',
  dataset: process.env.GATSBY_SANITY_DATASET || 'production',
  token: process.env.SANITY_READ_TOKEN
}

export default ({ node }) => {
  const fluidProps = getFluidGatsbyImage(node.asset._id, { maxWidth: 675 }, config)
  return <Img fluid={fluidProps} alt={node.alt} />
}
