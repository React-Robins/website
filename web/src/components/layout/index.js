import React from 'react'
import Header from '../header'
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components'
import otherFont from '../../fonts/neutra-text/style.css'
import RainbowWithClicker from '../rainbow/RainbowWithClicker'

const theme = {
  darkPurple: '#1E1126',
  white: '#FFFFFF',
  lightGrey: '#e6e2ff'
}

const Global = createGlobalStyle`
${otherFont}

body {
  font-family: 'Roboto Mono';
  background: ${props => props.theme.darkPurple};
    -webkit-font-smoothing: antialiased;
  color:  ${props => props.theme.white};
  margin: 0;
  box-sizing: border-box;
}

*, *:before,*:after {
  box-sizing: inherit;
}

a {
  color: ${props => props.theme.white};
}

html,
body,
body > div,
body > div > div {
  height: 100%;
}

ul li {
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
}

figure {
  margin: 0;
}
`

const Wrapper = styled.main`
  width: 80%;
  max-width: 720px;
  margin: auto;
`

const SideRainbow = styled(RainbowWithClicker)`
  position: fixed;
  width: 2em;
  left: 0;
  top: 0;
  bottom: 0;
  @media (min-width: 720px) {
    width: 8vw;
  }
`

const Layout = ({children, siteTitle}) => (
  <ThemeProvider theme={theme}>
    <>
      <SideRainbow />
      <Global />
      <Wrapper>
        <Header siteTitle={siteTitle} />
        {children}
      </Wrapper>
    </>
  </ThemeProvider>
)

export default Layout
