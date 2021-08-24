import React from 'react'
import { Nav, LogoWrap, Codelings, Subtitle, NavRow, NavLink, NavHref } from './elements'
import ReactLogo from './logo'

const Header = ({ siteTitle }) => (
  <Nav>
    <Codelings />
    <h1
      css={`
        display: block;
        overflow: hidden;
        text-indent: 100%;
        white-space: nowrap;
        font-size: 2px;
      `}
    >
      React Robins
    </h1>
    <Subtitle>A supportive community for women and non-binary React enthusiasts</Subtitle>
    <NavRow>
      <LogoWrap>
        React Robins <ReactLogo />
      </LogoWrap>

      <ul>
        <li>
          <NavLink to="/">Events</NavLink>
        </li>
        <li>
          <NavHref
            href="https://opencollective.com/react-ladies"
            target="_blank"
            title="Donate to React Robins"
            rel="noopener noreferrer"
          >
            Donate
          </NavHref>
        </li>
        <li>
          <NavLink to="/organizers">Organizers</NavLink>{' '}
        </li>
        <li>
          <NavLink to="/faq">FAQ</NavLink>{' '}
        </li>
        <li>
          <NavHref href="/discord">Discord</NavHref>{' '}
        </li>
      </ul>
    </NavRow>
  </Nav>
)

export default Header
