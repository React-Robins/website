import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { Link } from 'gatsby'
import Panel from '../components/Panel'

const FAQPage = () => {
  return (
    <Layout>
      <SEO
        title="React Ladies - FAQ"
        description="A supportive community for women and non-binary React enthusiasts"
      />
      <main>
        <h1 hidden>Welcome to React Ladies</h1>
        <Panel heading="FAQ"></Panel>
        <Panel heading="How do I speak at an upcoming React Ladies event?" id="how-to-speak">
          TBD.{' '}
        </Panel>
        <Panel heading="How can I get involved?" id="get-involved">
          Check out our page on
          <Link to="/getting-involved"> getting involved </Link> with React Ladies for more
          information.
        </Panel>

        <Panel heading="Any other questions?" id="questions">
          Please{' '}
          <a
            href="https://github.com/queerjs/info/issues/new"
            rel="noopener noreferrer"
            title="QueerJS Info"
            target="_blank"
          >
            open an issue
          </a>
          , send us a message on{' '}
          <a
            href="https://twitter.com/reactjsladies"
            rel="noopener noreferrer"
            title="Twitter"
            target="_blank"
          >
            Twitter
          </a>
          , or email us at{' '}
          <a
            href="mailto:monica+reactladies@aboutmonica.com"
            rel="noopener noreferrer"
            title="Email"
          >
            monica@reactladies.com
          </a>
          !
        </Panel>
      </main>
    </Layout>
  )
}

export default FAQPage
