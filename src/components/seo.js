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
          content: '@Nikkitaftw'
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
          content:
            'https://rawcdn.githack.com/SaraVieira/queerjs/c97e919e49430435a96c2b9193ea814b795acb68/web/src/assets/gayjs.png'
        },
        {
          name: 'twitter:site',
          content: 'https://queerjs.com'
        },
        {
          name: 'og:url',
          content: 'https://queerjs.com'
        },
        {
          name: 'image',
          content:
            'https://rawcdn.githack.com/SaraVieira/queerjs/c97e919e49430435a96c2b9193ea814b795acb68/web/src/assets/gayjs.png'
        },
        {
          name: 'og:image',
          content:
            'https://rawcdn.githack.com/SaraVieira/queerjs/c97e919e49430435a96c2b9193ea814b795acb68/web/src/assets/gayjs.png'
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
