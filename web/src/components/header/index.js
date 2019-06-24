import React from 'react'

import logo from './logo.svg'
import RainbowWithClicker from '../rainbow/RainbowWithClicker'
import {Nav, Logo, Title, Subtitle} from './elements'

const Header = ({siteTitle}) => (
  <Nav>
    <section>
      <Title to='/'>{siteTitle}</Title>
      <Subtitle>A meetup for everyone where Queer Speakers take the stage</Subtitle>
    </section>
    <RainbowWithClicker stripes={['red']}>
      <Logo src={logo} alt='Queer JS' />
    </RainbowWithClicker>
  </Nav>
)

export default Header
