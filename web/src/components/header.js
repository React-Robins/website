import {Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import logo from '../assets/gayjs.png'

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`

const Logo = styled.img`
  width: 200px;
`

const Title = styled(Link)`
  display: none;
`

const Header = ({siteTitle}) => (
  <Nav>
    <Logo src={logo} alt='Queer JS' />
    <Title to='/'>{siteTitle}</Title>
  </Nav>
)

export default Header
