import React from 'react';
import Navbar from '@common/Navbar';
import Layout from '@common/Layout';
import Footer from '@sections/Footer';
import { Container } from '@components/global';

const JoinSlack = () => (
  <Layout>
    <Navbar />
    <Container>
      <h1>Join Our Online Slack Community</h1>
      <iframe
        class="airtable-embed"
        src="https://airtable.com/embed/shr05ToMIvHWsUvbs?backgroundColor=orange"
        frameborder="0"
        onmousewheel=""
        width="100%"
        height="533"
        title="react-ladies-slack-form"
      />
    </Container>
    <Footer />
  </Layout>
);

export default JoinSlack;
