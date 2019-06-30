import React from 'react'

import logo from './logo.svg'
import RainbowWithClicker from '../rainbow/RainbowWithClicker'
import { Nav, Logo, Title, Subtitle } from './elements'

const Header = ({ siteTitle }) => (
  <Nav>
    <section>
      <Title to="/">{siteTitle}</Title>
      <Subtitle>A meetup for everyone where Queer Speakers take the stage</Subtitle>
      <a
        css={`
          text-decoration: none;

          > div {
            padding: 10px;
          }
        `}
        href="https://opencollective.com/queerjs/donate"
        target="_blank"
      >
        <RainbowWithClicker stripes={['red']}>
          <span
            css={`
              color: #1e1126;
              font-weight: bold;
            `}
          >
            Donate to our open collective
          </span>
        </RainbowWithClicker>
      </a>
    </section>
    <RainbowWithClicker stripes={['red']}>
      <Logo src={logo} alt="Queer JS" />
    </RainbowWithClicker>
  </Nav>
)

export default Header
