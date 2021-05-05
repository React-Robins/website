import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Panel from '../components/Panel'

import { RsvpButton, Blinker, Bouncer } from '../components/Info/elements'

export default () => {
  const { site } = {
    site: {
      title: 'React Ladies',
      description: 'A supportive community for women and non-binary React enthusiasts'
    }
  }
  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <h1 hidden>Welcome to {site.title}</h1>

        <Panel heading="How do I submit a talk?" id="submit-a-talk">
          {' '}
          First of all, thank you for thinking considering submitting a talk to React Ladies. You
          can submit a talk by clicking the button at the bottom to go to our GitHub repo and from
          there, you can use our issue templates to guide you through your talk submission. If you
          need any help with this process because you are new to GitHub, git or speaking in general,
          ping one of the organizers on Discord or send us a message on{' '}
          <a
            href="https://twitter.com/reactjsladies"
            rel="noopener noreferrer"
            title="Twitter"
            target="_blank"
          >
            Twitter
          </a>
          . Happy to help any way we can!
        </Panel>

        <RsvpButton>
          <a
            title="Proposals"
            href="https://github.com/react-ladies/react-ladies-talk-proposals/issues/new/choose"
          >
            <Blinker delay={0}>{'>'}</Blinker>
            <Blinker delay={1}>{'>'}</Blinker>
            <Blinker delay={2}>{'>'}</Blinker>
            <Blinker delay={3}>{'>'}</Blinker>
            <Bouncer>Speak @ React Ladies</Bouncer>
            <Blinker delay={3}>{'<'}</Blinker>
            <Blinker delay={2}>{'<'}</Blinker>
            <Blinker delay={1}>{'<'}</Blinker>
            <Blinker delay={0}>{'<'}</Blinker>
          </a>
        </RsvpButton>
      </main>
    </Layout>
  )
}
