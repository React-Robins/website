import React from 'react';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import { Link } from 'gatsby';
import Panel, { LargeParagraph } from '../components/Panel';

const GettingInvolvedPage = () => {
  return (
    <Layout>
      <SEO
        title='React Robins - Getting Involved'
        description='A supportive community for women and non-binary React enthusiasts'
      />
      <main>
        <Panel>
          <LargeParagraph>
            There are a lot of ways you could get involved with React Robins!
            <br />
            <br />
            If you think you'd like to do this, we'd love to work with you to
            make it happen - please contact us via{' '}
            <a
              href='https://twitter.com/ReactJSRobins'
              rel='noopener noreferrer'
              title='Twitter'
              target='_blank'
            >
              Twitter
            </a>
            , or email us at{' '}
            <a
              href='mailto:community@reactrobins.com'
              rel='noopener noreferrer'
              title='Email'
            >
              community@reactrobins.com
            </a>
            !
          </LargeParagraph>
        </Panel>
        <Panel heading='Getting Involved'></Panel>
        <p>
          We're always looking for new locations to host meetups, as well as
          folks on the ground to act as local organizers and MCs.
          <br />
          <br />
          Involvement might include working with your employers to provide a
          space, organizing catering for meetup attendees, ensuring that there
          is a livestream or opportunity to record the speakers, and generally
          working to ensure that the meetup runs smoothly.
        </p>
      </main>
    </Layout>
  );
};

export default GettingInvolvedPage;
