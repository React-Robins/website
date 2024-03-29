import React from 'react';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import { Link } from 'gatsby';
import Panel from '../components/Panel';

const FAQPage = () => {
  return (
    <Layout>
      <SEO
        title='React Robins - FAQ'
        description='A supportive community for women and non-binary React enthusiasts'
      />
      <main>
        <h1 hidden>Welcome to React Robins</h1>
        <Panel heading='FAQ'></Panel>
        <Panel
          heading='How do I speak at an upcoming React Ladies event?'
          id='how-to-speak'
        >
          Thank you for your interest in speaking to our community. Please
          submit a talk proposal through our{' '}
          <a
            href='/submit-talk'
            target='_blank'
            title='Form to submit a talk'
            rel='noopener noreferrer'
          >
            form
          </a>
          . If you have any questions do not hesistate to reach out to us!
        </Panel>
        <Panel heading='How can I get involved?' id='get-involved'>
          Check out our page on{' '}
          <Link to='/getting-involved'>getting involved</Link> with React Ladies
          for more information.
        </Panel>
        <Panel
          heading='Was React Robins previously React Ladies?'
          id='get-involved'
        >
          Yes! In order to create a more inclusive environment, we changed our
          name so that we can be more supportive towards all React enthusiasts.
        </Panel>
        <Panel heading='Any other questions?' id='questions'>
          Please send us a message on{' '}
          <a
            href='https://twitter.com/ReactJSRobins'
            rel='noopener noreferrer'
            title='Twitter'
            target='_blank'
          >
            Twitter
          </a>{' '}
          or email us at{' '}
          <a
            href='mailto:community@reactrobins.com'
            rel='noopener noreferrer'
            title='Email'
          >
            community@reactrobins.com
          </a>
          !
        </Panel>
      </main>
    </Layout>
  );
};

export default FAQPage;
