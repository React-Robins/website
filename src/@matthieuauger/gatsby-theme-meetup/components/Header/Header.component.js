import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import MeetupLogo from './MeetupLogo.component.js';
import StyledHeader from './Header.style';
import Menu from './Menu.component.js';

const Header = () => (
  <StaticQuery
    query={graphql`
      query SiteMetaDataQuery {
        site {
          siteMetadata {
            meetupName
          }
        }
      }
    `}
    render={data => (
      <div className="header-container">
        <StyledHeader>
          <div className="logo">
            <Link to="/">
              <MeetupLogo />
            </Link>
            <div className="app-name">
              <div className="app-name-classic">
                {data.site.siteMetadata.meetupName}
              </div>
              <div className="app-name-highlight">Meetup</div>
            </div>
          </div>
          <Menu />
        </StyledHeader>
      </div>
    )}
  />
);

export default Header;
