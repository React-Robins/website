import React from 'react'
import Helmet from 'react-helmet'

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
        // {
        //   name: 'twitter:image',
        //   content:
        //     ''
        // },
        // {
        //   name: 'og:image',
        //   content:
        //     ''
        // },
        {
          name: 'twitter:site',
          content: 'https://reactladies.com'
        },
        {
          name: 'og:url',
          content: 'https://reactladies.com'
        }
        // {
        //   name: 'image',
        //   content:
        //     ''
        // },
        // {
        //   name: 'og:image',
        //   content:
        //     ''
        // }
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
