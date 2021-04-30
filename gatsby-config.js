// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.production`
})

module.exports = {
  siteMetadata: {
    siteUrl: 'https://reactladies.com'
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: 'Roboto Mono',
              variants: ['300', '400', '500']
            }
          ]
        }
      }
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.GATSBY_AIRTABLE_KEY,
        tables: [
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE,
            tableName: `registration`,
            queryName: `attendees` // optional
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'data',
        name: 'events'
      }
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: 'Event'
      }
    }
  ]
}
