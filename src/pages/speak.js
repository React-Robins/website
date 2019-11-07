import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Panel from '../components/Panel'

import { RsvpButton, Blinker, Bouncer } from '../components/Info/elements'

export default () => {
  const { site } = {
    site: {
      title: 'QueerJS',
      description: 'A meetup for everyone where Queer Speakers take the stage'
    }
  }
  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <h1 hidden>Welcome to {site.title}</h1>
        <Panel heading="Speaking at QueerJS">
          First of all, thank you for thinking about submitting a talk to an upcoming QueerJS event.
          We're happy you're here{' '}
          <span role="img" aria-label="Queer Rainbow">
            🌈
          </span>
        </Panel>
        <Panel heading="How do I submit a talk?">
          Click the shiny button at the bottom! That will lead you to our GitHub repo and from
          there, you can use one of our of issue templates to guide you through your talk
          submission. If you need any help with this process because you are new to GitHub, git or
          speaking in general, ping one of the organizers on{' '}
          <a
            href="https://discord.gg/jhMwNfK"
            rel="noopener noreferrer"
            title="Discord Server"
            target="_blank"
          >
            Discord
          </a>{' '}
          or send us a message on{' '}
          <a
            href="https://twitter.com/QueerJS"
            rel="noopener noreferrer"
            title="Twitter"
            target="_blank"
          >
            Twitter
          </a>
          . Happy to help any way we can!
        </Panel>
        <Panel heading="What should I talk about?">
          Anything you're passionate about, really. The talks don't have to be technical (but they
          certainly can be). The most important thing is that you're excited about your topic.
          That's the amazing thing about public speaking - you get to share your passions with the
          world. Just keep in mind that all talks must follow our{' '}
          <a
            href="https://queerjs.com/code-of-conduct/"
            rel="noopener noreferrer"
            title="Code of Conduct"
            target="_blank"
          >
            Code of Conduct
          </a>
          .
        </Panel>
        <Panel heading="How long should my talk be?">
          At every event, we plan to have a mix of longer 20-25 minute talks and 5-10 minute
          lightning talks. So do whatever you feel most comfortable with! If you need more time to
          present, please let us know so we can adjust the schedule or coordinate with the venue.
        </Panel>
        <Panel heading="What if the lineup for the location I want to speak at is full?">
          It's very, very likely that if we host a QueerJS in a city, we'll do it again in the same
          city one day. So we'd still encourage you to submit your talk. That way, you'll be at the
          top of the list for the next edition!
        </Panel>
        <Panel heading="Can you pay for my flights? ">
          Actually, there's a good chance that we can if you're coming from a reasonable distance
          (total cost is less than 300 EUR). If you'd like to speak at an upcoming meetup and need
          travel assistance for any reason, please mention it in your talk proposal and we'll let
          you know if it's possible.
        </Panel>
        <Panel heading=" What's the talk selection process?">
          Talk slots are first come, first served (for the most part). After you open your issue,
          one of the organizers will reach out and let you know the next steps!
        </Panel>

        <Panel heading="Speak 🎉">
          <RsvpButton>
            <a
              title="Proposals"
              href="https://github.com/queerjs/queerjs-talk-proposals/issues/new/choose"
            >
              <Blinker delay={0}>{'>'}</Blinker>
              <Blinker delay={1}>{'>'}</Blinker>
              <Blinker delay={2}>{'>'}</Blinker>
              <Blinker delay={3}>{'>'}</Blinker>
              <Bouncer>SPEAK AT QUEERJS</Bouncer>
              <Blinker delay={3}>{'<'}</Blinker>
              <Blinker delay={2}>{'<'}</Blinker>
              <Blinker delay={1}>{'<'}</Blinker>
              <Blinker delay={0}>{'<'}</Blinker>
            </a>
          </RsvpButton>
        </Panel>
      </main>
    </Layout>
  )
}
