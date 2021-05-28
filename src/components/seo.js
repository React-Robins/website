import React from 'react'
import Helmet from 'react-helmet'

import defaultMetaImage from '../assets/react-ladies.png'

const siteUrl = 'https://reactladies.com'
const socialImage = `${siteUrl}${defaultMetaImage}`

function SEO({ description, lang, meta, title }) {
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={title}
      meta={[
        {
          name: 'description',
          content: description
        },
        {
          property: 'og:title',
          content: title
        },
        {
          property: 'og:site_name',
          content: title
        },
        {
          property: 'og:description',
          content: description
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:creator',
          content: '@reactjsladies'
        },
        {
          name: 'twitter:title',
          content: title
        },
        {
          name: 'twitter:description',
          content: description
        },
        {
          name: 'twitter:image',
          content: socialImage
        },
        {
          name: 'og:image',
          content: socialImage
        },

        {
          name: 'twitter:site',
          content: siteUrl
        },
        {
          name: 'og:url',
          content: siteUrl
        },
        {
          name: 'image',
          content: socialImage
        },
        {
          name: 'og:image',
          content: socialImage
        }
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: []
}
export default SEO
