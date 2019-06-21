import React from 'react';
import Navbar from '@common/Navbar';
import Layout from '@common/Layout';
import Footer from '@sections/Footer';
import { Container } from '@components/global';

const Partnerships = () => (
  <Layout>
    <Navbar external />
    <Container>
      <h1>Partner with React Ladies</h1>
      <iframe
        className="airtable-embed"
        src="https://airtable.com/embed/shrKdwBV29CyooYhU?backgroundColor=purple"
        frameBorder="0"
        width="100%"
        height="533"
        title="react-ladies-partnership-form"
      />
    </Container>
    <Footer />
  </Layout>
);

export default Partnerships;
