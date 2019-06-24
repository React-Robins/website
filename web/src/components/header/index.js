import {Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import logo from './logo.svg'
import RainbowWithClicker from '../rainbow/RainbowWithClicker'

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 30px;

  @media screen and (max-width: 400px) {
    flex-direction: column-reverse;
  }
`

const Logo = styled.img`
  width: 150px;
`

const Title = styled(Link)`
  font-size: 36px;
  font-family: 'NeutraText-Bold';
  color: ${props => props.theme.white};
  letter-spacing: -1.2px;
  text-decoration: none;

  @media screen and (max-width: 400px) {
    margin-top: 20px;
  }
`

const Subtitle = styled.h2`
  font-size: 28px;
  font-family: 'NeutraText-Bold';
  color: ${props => props.theme.lightGrey};
  letter-spacing: -1.2px;
  max-width: 350px;
`

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
