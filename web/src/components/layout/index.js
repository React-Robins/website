import React from 'react'
import Header from '../header'
import { ThemeProvider } from 'styled-components'
import { theme, Container, Global, Wrapper, SubWrapper, SideRainbow } from './elements'

const Layout = ({ children, siteTitle }) => (
  <ThemeProvider theme={theme}>
    <Container>
      <SideRainbow />
      <Global />
      <Wrapper>
        <Header siteTitle={siteTitle} />
        <SubWrapper>{children}</SubWrapper>
      </Wrapper>
    </Container>
  </ThemeProvider>
)

export default Layout
