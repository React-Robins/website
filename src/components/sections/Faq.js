import React from 'react';

import { Section, Container, StyledLink } from '@components/global';

import FaqItem from '@common/FaqItem';

const FAQS = [
  {
    title: 'Who should join React Ladies?',
    content: () => (
      <>
        Our community is for women and non-binary folks with any experience with
        or interest in React. All current and aspiring React developers are
        welcome. Bring your laptop and a friend!
      </>
    ),
  },
  {
    title: 'How can I get involved with React Ladies?',
    content: () => (
      <>
        You can submit a talk for an upcoming event &nbsp;
        <StyledLink to="/submit-talk/">here</StyledLink>
        &nbsp; or fill out{' '}
        <StyledLink to="/partnerships/">this form</StyledLink> if you are
        interesting in becoming a co-organizer or are looking for other ways to
        get more involved.
      </>
    ),
  },
  {
    title: 'What is the React Ladies Code of Conduct?',
    content: () => (
      <>
        React Ladies is dedicated to providing a harassment-free experience for
        everyone, regardless of gender, gender identity and expression, age,
        sexual orientation, disability, physical appearance, body size, race,
        ethnicity, religion (or lack thereof), or technology choices. We do not
        tolerate harassment of participants in any form. Participants violating
        these rules may be removed from this community at the discretion of the
        organizers. (Adapted from JS Conf Code of Conduct)
      </>
    ),
  },
  {
    title: 'How can my company partner with React Ladies?',
    content: () => (
      <>
        React Ladies is currently looking for partners to provide food and venue
        space for upcoming events. Please fill out &nbsp;
        <StyledLink to="/partnerships/">this form</StyledLink>
        &nbsp; if you'd like to learn more about partnership opportunities.
      </>
    ),
  },
];

const Faq = () => (
  <Section id="faq">
    <Container>
      <h1 style={{ marginBottom: 40 }}>Frequently Asked Questions</h1>
      <div>
        {FAQS.map(({ title, content }) => (
          <FaqItem title={title} key={title}>
            {content()}
          </FaqItem>
        ))}
      </div>
    </Container>
  </Section>
);

export default Faq;
