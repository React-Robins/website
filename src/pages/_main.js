import React from 'react'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Sponsors from '../components/Sponsors'
import Info from '../components/Info'
import Speakers from '../components/Speakers'
import Organizers from '../components/Organizers'
import Attendees from '../components/Attendees'
import Thanks from '../components/Thanks'
import Panel from '../components/Panel'
import Heading from '../components/Heading'
//import Announcement from '../components/Announcement'

const Main = ({ city, attendees }) => {
  // announcement
  const { site, thanks, speakers, sponsors, info, mainOrganizer } = city

  return (
    <Layout>
      <SEO
        title={`React Ladies - ${info.city}`}
        description={'A supportive community for women and non-binary React enthusiasts'}
      />
      <section>
        <Heading sub="Join React Ladies @">{info.city}</Heading>
        <Panel>
          {site.customDescription ? (
            <p>{site.customDescription}</p>
          ) : (
            <p>
              React Ladies is a supportive community for women and non-binary React enthusiasts with
              any level of programming experience to grow as technologists and meet other React
              developers. We center our events around JavaScript and other technologies within the
              React ecosystem.
            </p>
          )}
        </Panel>
        {/*announcement && <Announcement message={announcement} />*/}
        <Info attendeesNumber={attendees.length} site={site} info={info} city={info.link} />

        {speakers.length > 0 || site.cfp ? (
          <Panel heading="Speakers">
            <Speakers cfp={site.cfp} speakers={speakers.filter(s => !s.mc)} />
          </Panel>
        ) : null}
        {speakers.filter(s => s.mc).length ? (
          <Panel heading="MC">
            <Speakers noSpeak cfp={site.cfp} speakers={speakers.filter(s => s.mc)} />
          </Panel>
        ) : null}
        {!site.rsvpLink ? (
          <Panel heading={`Attendees (${attendees.length})`}>
            <Attendees attendees={attendees} />
          </Panel>
        ) : null}
        <Panel heading="Sponsors">
          <Sponsors sponsors={sponsors} />
        </Panel>
        {mainOrganizer && mainOrganizer.length > 0 ? (
          <Panel heading={mainOrganizer.length > 1 ? 'Organizers' : 'Organizer'}>
            <Organizers organizers={mainOrganizer} />
          </Panel>
        ) : null}
      </section>

      <Panel heading={thanks && thanks.length ? 'Special Thanks' : null}>
        <Thanks thanks={thanks || []} />
      </Panel>
    </Layout>
  )
}

export default Main
