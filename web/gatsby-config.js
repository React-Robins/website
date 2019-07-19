// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-react-helmet',
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
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Berlin',
        fieldName: 'berlin',
        url: 'https://atggkqis.api.sanity.io/v1/graphql/production/default'
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'London',
        fieldName: 'london',
        url: 'https://atggkqis.api.sanity.io/v1/graphql/london/default'
      }
    }
    // {
    //   resolve: 'gatsby-source-sanity',
    //   options: {
    //     projectId: process.env.GATSBY_SANITY_PROJECT_ID || 'atggkqis',
    //     dataset: 'production',
    //     token: process.env.SANITY_READ_TOKEN,
    //     watchMode: !isProd,
    //     overlayDrafts: !isProd
    //   }
    // },
  ]
}
