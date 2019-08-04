import React from 'react';
import { graphql } from 'gatsby';
import dayjs from 'dayjs';

import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Meetup from '../components/Meetup';
import TextBlock from '../components/TextBlock';

let currentMeetupColor = '#D3CDDB';
let pastMeetupColors = [
  '#E1ECF7',
  '#E8E8E8',
  '#B6BECA',
  '#E1ECF7',
  '#E8E8E8',
  '#B6BECA',
];

/**
 * If there is no upcoming meetup, return `null`
 * Else, return the meetup in the future closest to today by sorting
 * by ascending date and returning the first element
 */
const getNextMeetup = meetups =>
  meetups.length === 0
    ? null
    : meetups.sort((a, b) =>
        dayjs(a.local_date).isBefore(dayjs(b.local_date)) ? -1 : 1
      )[0];

const IndexPage = ({ data }) => {
  const upcomingMeetups = data.meetupGroup.events.filter(
    event => event.status === 'upcoming' || event.status === 'draft'
  );
  const nextMeetup = getNextMeetup(upcomingMeetups);
  const pastMeetups = data.meetupGroup.events.filter(
    event => event.status === 'past'
  );
  return (
    <Layout>
      <h1>{data.site.siteMetadata.meetupHomepageHeadline}</h1>
      {nextMeetup && (
        <Meetup
          meetupInfo={nextMeetup}
          meetupType="UPCOMING"
          backgroundColor={currentMeetupColor}
          displayVideosLink={data.site.siteMetadata.displayVideosLink}
          displayVideosTranslation={
            data.site.siteMetadata.translations.FETCH_VIDEOS
          }
          meetupVideosUrl={data.site.siteMetadata.meetupVideosUrl}
          registerOnMeetupTranslation={
            data.site.siteMetadata.translations.REGISTER_ON_MEETUP
          }
          dateFormat={data.site.siteMetadata.dateFormat}
        />
      )}
      <TextBlock textBlockHTML={data.whatIsJAMstackTextBlock.html} />
      <h2>{data.site.siteMetadata.translations.LAST_MEETUPS}</h2>
      {pastMeetups.map((pastMeetup, index) => {
        return (
          <Meetup
            key={pastMeetup.id}
            meetupInfo={pastMeetup}
            meetupType="PAST"
            backgroundColor={pastMeetupColors[index]}
            displayVideosLink={data.site.siteMetadata.displayVideosLink}
            displayVideosTranslation={
              data.site.siteMetadata.translations.FETCH_VIDEOS
            }
            meetupVideosUrl={data.site.siteMetadata.meetupVideosUrl}
            registerOnMeetupTranslation={
              data.site.siteMetadata.translations.REGISTER_ON_MEETUP
            }
            dateFormat={data.site.siteMetadata.dateFormat}
          />
        );
      })}
      <TextBlock textBlockHTML={data.submitATalk.html} />
      <Footer />
    </Layout>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        displayVideosLink
        meetupHomepageHeadline
        meetupVideosUrl
        translations {
          LAST_MEETUPS
          FETCH_VIDEOS
          REGISTER_ON_MEETUP
        }
        dateFormat
      }
    }
    meetupGroup {
      events {
        id
        name
        description
        local_date
        venue {
          name
          address_1
          city
        }
        link
        status
      }
      name
    }
    whatIsJAMstackTextBlock: markdownRemark(
      frontmatter: { type: { eq: "what-is-jamstack" } }
    ) {
      html
    }
    submitATalk: markdownRemark(
      frontmatter: { type: { eq: "submit-a-talk" } }
    ) {
      html
    }
  }
`;

export default IndexPage;
