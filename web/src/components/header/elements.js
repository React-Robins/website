import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

export const Nav = styled.nav`
  margin: auto;
  margin-bottom: 4em;
  padding: 3em 0;
  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
  }
`

export const NavRow = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  ul,
  li {
    display: inline;
  }
`

export const Logo = styled.img`
  height: 50px;
  float: left;
`

export const Title = styled(Link)`
  font-size: 36px;
  font-family: ${props => props.theme.neutra};
  color: ${props => props.theme.lightGrey};
  letter-spacing: -1.2px;
  text-decoration: none;

  @media screen and (max-width: 600px) {
    margin-top: 20px;
    display: block;
  }
`

const link = css`
  font-family: ${props => props.theme.neutra};
  font-size: 1.6rem;
  float: left;
  margin-right: 1em;
`

export const NavHref = styled.a`
  ${link}
`

export const NavLink = styled(Link)`
  ${link}
`

export const Subtitle = styled.h2`
  font-size: 0.8rem;
  font-family: ${props => props.theme.roboto};
  color: ${props => props.theme.lightPurple};
  margin: 0;
  font-weight: 400;
`

export const Codelings = styled.div`
  font-family: ${props => props.theme.neutra};
  color: ${props => props.theme.contrastPurple};
  font-size: 6rem;
  letter-spacing: 0.75em;
  position: absolute;
  transform: rotate(-3deg);
  left: -25vw;
  top: -1em;
  right: -25vw;
  z-index: -1;
  line-height: 1em;
  height: 3em;
  overflow: hidden;
  text-align: right;
`
