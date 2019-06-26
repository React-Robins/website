import React from 'react';
import Navbar from '@common/Navbar';
import Layout from '@common/Layout';
import Footer from '@sections/Footer';
import { Container } from '@components/global';

const SubmitTalk = () => (
  <Layout>
    <Navbar />
    <Container>
      <h1>Submit a Lightning Talk</h1>
      <iframe
        clasName="airtable-embed"
        src="https://airtable.com/embed/shrphJUHyS1h6UK0Y?backgroundColor=gray"
        frameBorder="0"
        width="100%"
        height="533"
        title="react-ladies-submit-talk-form"
      />
    </Container>
    <Footer />
  </Layout>
);

export default SubmitTalk;
