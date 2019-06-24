import React from 'react'
import Header from '../header'
import { ThemeProvider } from 'styled-components'
import { theme, Global, Wrapper, SideRainbow } from './elements'

const Layout = ({ children, siteTitle }) => (
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
