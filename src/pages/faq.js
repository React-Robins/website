import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
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
        <Panel heading="How do I speak at QueerJS?">
          We'd love for you to speak at a meetup! Please see {' '}  
          <a
            href="/speak"
            rel="noopener noreferrer"
            title="Speak"
          >
            Speaking at QueerJS
          </a> for more information about how you can propose a talk to a future iteration of QueerJS.
        </Panel>
        <Panel heading="How can I get involved?">
          There are a lot of ways you could get involved with QueerJS! We're always looking for new locations to
          host meetups, as well as folks on the ground to act as local organizers and MCs.
          <br/><br/>
          Involvement might mean working with your employers to provide a space, organizing catering for meetup
          attendees, ensuring that there is a livestream or opportunity to record the speakers, and generally working
          to ensure that the meetup runs smoothly.
          <br/><br/>
          If you think you'd like to do this, we'd love to work with you to make
          it happen - please contact us via {' '}
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
            href="hello@queerjs.com"
            rel="noopener noreferrer"
            title="Email"
          >
            hello@queerjs.org
          </a>!
        </Panel>
        <Panel heading="Where does QueerJS happen?">
          We have a bunch of meetups being planned all over the globe{' '}
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
        <Panel heading="Can I print and redistribute the meetup stickers?">
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
        <Panel heading="Any other questions?">
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
            href="hello@queerjs.com"
            rel="noopener noreferrer"
            title="Email"
          >
            hello@queerjs.org
          </a>!
        </Panel>
      </main>
    </Layout>
  )
}

export default FAQPage
