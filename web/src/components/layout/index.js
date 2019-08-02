import React from 'react'
import Header from '../header'
import { ThemeProvider } from 'styled-components'
import { theme, Global, Wrapper, SubWrapper, SideRainbow } from './elements'

const Layout = ({ children, siteTitle }) => (
  <ThemeProvider theme={theme}>
    <>
      <SideRainbow />
      <Global />
      <Wrapper>
        <Header siteTitle={siteTitle} />
        <SubWrapper>{children}</SubWrapper>
      </Wrapper>
    </>
  </ThemeProvider>
)

export default Layout
