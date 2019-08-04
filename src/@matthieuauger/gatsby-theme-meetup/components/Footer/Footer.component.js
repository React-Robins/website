import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import StyledFooter from './Footer.style';

const Footer = () => (
  <StaticQuery
    query={graphql`
      query FooterContentQuery {
        footerContent: markdownRemark(frontmatter: { type: { eq: "footer" } }) {
          html
        }
      }
    `}
    render={data => (
      <StyledFooter
        dangerouslySetInnerHTML={{
          __html: data.footerContent.html,
        }}
      ></StyledFooter>
    )}
  />
);

export default Footer;
