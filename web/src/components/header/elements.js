import { Link } from 'gatsby'
import styled from 'styled-components'

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 30px;

  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
  }
`

export const Logo = styled.img`
  width: 150px;
`

export const Title = styled(Link)`
  font-size: 36px;
  font-family: 'NeutraText-Bold';
  color: ${props => props.theme.white};
  letter-spacing: -1.2px;
  text-decoration: none;

  @media screen and (max-width: 600px) {
    margin-top: 20px;
    display: block;
  }
`

export const Subtitle = styled.h2`
  font-size: 28px;
  font-family: 'NeutraText-Bold';
  color: ${props => props.theme.lightGrey};
  letter-spacing: -1.2px;
  max-width: 350px;
`
