import {Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/gayjs.png'

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 960px;
  max-width: 80%;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 30px;
`

const Logo = styled.img`
  width: 150px;
`

const Title = styled(Link)`
  font-size: 32px;
  color: ${props => props.theme.white};
  letter-spacing: -1.2px;
  text-decoration: none;
`

const Subtitle = styled.h2`
  font-size: 24px;
  color: ${props => props.theme.lightGrey};
  letter-spacing: -1.2px;
  max-width: 300px;
`

const Header = ({siteTitle}) => (
  <Nav>
    <div>
      <Title to='/'>{siteTitle}</Title>
      <Subtitle>A meetup for everyone where Queer Speakers take the stage</Subtitle>
    </div>
    <Logo src={logo} alt='Queer JS' />
  </Nav>
)

export default Header
