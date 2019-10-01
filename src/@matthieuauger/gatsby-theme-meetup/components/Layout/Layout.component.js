import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import favicon from '../../images/favicon-16x16.png';

import Header from '../Header';
import './layout.css';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query MeetupGroupNameQuery {
        site {
          siteMetadata {
            meetupName
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.meetupName}
          meta={[
            { name: 'description', content: data.site.siteMetadata.meetupName },
            { name: 'keywords', content: 'meetup' }, //TODO dynamize keywords
          ]}
          link={[
            { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` }, //TODO specific component for favicon to ease shadowing
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header />
        <div>{children}</div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
