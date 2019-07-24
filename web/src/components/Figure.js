import React from 'react'
import Img from 'gatsby-image'
import { getFluidGatsbyImage } from 'gatsby-source-sanity'

export default ({ node, dataset }) => {
  const config = {
    projectId: process.env.GATSBY_SANITY_PROJECT_ID || 'atggkqis',
    dataset: dataset || 'production',
    token: process.env.SANITY_READ_TOKEN
  }
  const fluidProps = getFluidGatsbyImage(node.asset._id, { maxWidth: 675 }, config)
  return <Img fluid={fluidProps} alt={node.alt} />
}
