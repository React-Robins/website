import React from 'react'

import logo from './logo.svg'
import RainbowWithClicker from '../rainbow/RainbowWithClicker'
import { Nav, Logo, Title, Subtitle } from './elements'

const Header = ({ siteTitle }) => (
  <Nav>
    <section>
      <Title to="/">{siteTitle}</Title>
      <Subtitle>A meetup for everyone where Queer Speakers take the stage</Subtitle>
      {/* <a href="https://opencollective.com/queerjs/donate" target="_blank">
        <img src="https://opencollective.com/queerjs/donate/button@2x.png?color=blue" width="300" />
      </a> */}
    </section>
    <RainbowWithClicker stripes={['red']}>
      <Logo src={logo} alt="Queer JS" />
    </RainbowWithClicker>
  </Nav>
)

export default Header
