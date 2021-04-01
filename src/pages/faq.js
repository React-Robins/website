import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { Link } from 'gatsby'
import Panel from '../components/Panel'

const FAQPage = () => {
  return (
    <Layout>
      <SEO
        title="QueerJS - Organizers"
        description="A meetup for everyone where Queer Speakers take the stage"
      />
      <main>
        <h1 hidden>Welcome to QueerJS</h1>
        <Panel heading="FAQ"></Panel>
        <Panel heading="How do I speak at QueerJS?" id="how-to-speak">
          We'd love for you to speak at a meetup! Please see {' '}  
          <a
            href="/speak"
            rel="noopener noreferrer"
            title="Speak"
          >
            Speaking at QueerJS
          </a> for more information about how you can propose a talk to a future iteration of QueerJS.
        </Panel>
        <Panel heading="How can I get involved?" id="get-involved">
          There are a lot of ways you could get involved with QueerJS! See{' '}
          <Link to="/getting-involved"> Getting Involved </Link>
          for more information.
        </Panel>
        <Panel heading="Where does QueerJS happen?" id="locations">
          We have a bunch of meetups being planned online and all over the globe{' '}
          <span role="img" aria-label="earth">
            🌍
          </span>{' '}
          You can check the{' '}
          <a
            href="/"
            title="Cities"
            rel="noopener noreferrer"
          >
            Cities
          </a>{' '}
          page for a list of the upcoming (and past) meetups.
        </Panel>
        <Panel heading="Can I print and redistribute the meetup stickers?" id="stickers">
          Yes! They're all open source and you can find them in our {' '}
          <a
            href="https://github.com/queerjs/brand-assets"
            title="Brand Assets"
            target="_blank"
            rel="noopener noreferrer"
          >
            Brand Assets
          </a>{' '}
          repository on GitHub.
        </Panel>
        <Panel heading="Any other questions?" id="questions">
          Please {' '}
          <a
            href="https://github.com/queerjs/info/issues/new"
            rel="noopener noreferrer"
            title="QueerJS Info"
            target="_blank"
          >
          open an issue
          </a>
          , send us a message on {' '}
          <a
            href="https://twitter.com/QueerJS"
            rel="noopener noreferrer"
            title="Twitter"
            target="_blank"
          >
            Twitter
          </a>
          , or email us at {' '}
          <a
            href="mailto:hello@queerjs.com"
            rel="noopener noreferrer"
            title="Email"
          >
            hello@queerjs.com
          </a>!
        </Panel>
      </main>
    </Layout>
  )
}

export default FAQPage
