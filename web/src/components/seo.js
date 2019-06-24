import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, keywords, title, image }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription = description || (data.site && data.site.description) || ''
        const siteTitle = (data.site && data.site.title) || ''

        return (
          <Helmet
            htmlAttributes={{ lang }}
            title={title}
            titleTemplate={title === siteTitle ? '%s' : `%s | ${siteTitle}`}
            meta={[
              {
                name: 'description',
                content: metaDescription
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
                content: metaDescription
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
                content: metaDescription
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
      }}
    />
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: []
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
    }
  }
`
