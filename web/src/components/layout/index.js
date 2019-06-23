import React from 'react'
import Header from '../header'
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components'
import otherFont from '../../fonts/neutra-text/style.css'
import RainbowWithClicker from '../rainbow/RainbowWithClicker'

const theme = {
  darkPurple: '#1E1126',
  white: '#FFFFFF'
}

const Global = createGlobalStyle`
${otherFont}

body {
  font-family: 'NeutraText-Bold';
  background: ${props => props.theme.darkPurple};
    -webkit-font-smoothing: antialiased;
  color:  ${props => props.theme.white};
  margin: 0;
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

const Main = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: auto;
`

const Rainbow = styled(RainbowWithClicker)`
  position: fixed;
  width: 2em;
  left: 0;
  top: 0;
  bottom: 0;
`

const Layout = ({children, siteTitle}) => (
  <ThemeProvider theme={theme}>
    <>
      <Global />
      <Rainbow />
      <Header siteTitle={siteTitle} />
      <Main>{children}</Main>
    </>
  </ThemeProvider>
)

export default Layout
