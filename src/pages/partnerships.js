import React from 'react';
import Navbar from '@common/Navbar';
import Layout from '@common/Layout';
import Footer from '@sections/Footer';
import { Container } from '@components/global';

const Partnerships = () => (
  <Layout>
    <Navbar />
    <Container>
      <h1>Partner with React Ladies</h1>
      <iframe
        class="airtable-embed"
        src="https://airtable.com/embed/shrKdwBV29CyooYhU?backgroundColor=purple"
        frameborder="0"
        onmousewheel=""
        width="100%"
        height="533"
        title="react-ladies-partnership-form"
      />
    </Container>
    <Footer />
  </Layout>
);

export default Partnerships;
