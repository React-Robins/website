import React from 'react'

import logo from './logo.svg'
import text from './text.svg'
import RainbowWithClicker from '../rainbow/RainbowWithClicker'
import { Nav, LogoWrap, Logo, Codelings, Subtitle, NavRow, NavLink, NavHref } from './elements'

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
      QueerJS
    </h1>
    <Subtitle>A meetup for everyone where Queer Speakers take the stage</Subtitle>
    <NavRow>
      <LogoWrap>
        <Logo irrelevant src={text} />
        <RainbowWithClicker stripes={['red']}>
          <Logo src={logo} alt="Queer JS" />
        </RainbowWithClicker>
      </LogoWrap>

      <ul>
        <li>
          <NavLink to="/">Cities</NavLink>
        </li>
        <li>
          <NavHref href="https://shop.queerjs.com" target="_blank" rel="noopener noreferrer">
            Shop
          </NavHref>
        </li>
        <li>
          <NavHref
            href="https://opencollective.com/queerjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Donate to our open collective
          </NavHref>
        </li>
      </ul>
    </NavRow>
  </Nav>
)

export default Header
