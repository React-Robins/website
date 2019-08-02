import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Sponsors from '../components/Sponsors'
import Info from '../components/Info'
import Attendees from '../components/Attendees'
import Speakers from '../components/Speakers'
import Thanks from '../components/Thanks'
import Panel from '../components/Panel'
import Heading from '../components/Heading'

const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const Main = ({ city, dataset }) => {
  const { site, organizers, mainOrganizer, thanks, speakers, attendees, sponsors } = city

  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      <main>
        <Heading sub="queerjs @">
          {capitalize(dataset === 'production' ? 'berlin' : dataset)}
        </Heading>
        <Info site={site} dataset={dataset} />
        <Panel heading="What?">
          <p>
            This is a meetup where anyone is welcome to attend and support the speakers and the idea
            but all the speakers will be Queer.
            <br />
            This meetup exists to give a voice to everyone, to make a safe space where everyone is
            welcome.
            <br />
            Join us! There will be food and stickers 🌈
          </p>
        </Panel>
        <Panel heading="Speakers">
          <Speakers dataset={dataset} cfp={site.cfp} speakers={speakers.filter(s => !s.mc)} />
        </Panel>
        {speakers.filter(s => s.mc).length ? (
          <Panel heading="MC">
            <Speakers
              noSpeak
              dataset={dataset}
              cfp={site.cfp}
              speakers={speakers.filter(s => s.mc)}
            />
          </Panel>
        ) : null}
        <Panel heading={`Attendees (${attendees.length})`}>
          <Attendees attendees={attendees} />
        </Panel>

        <Panel heading="Sponsors">
          <Sponsors sponsors={sponsors} />
        </Panel>
      </main>
      <Panel heading="Special Thanks">
        <Thanks
          organizers={organizers}
          thanks={thanks}
          site={site}
          mainOrganizer={mainOrganizer.find(o => o.main)}
        />
      </Panel>
    </Layout>
  )
}

export default Main
