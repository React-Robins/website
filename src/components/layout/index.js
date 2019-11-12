import React from 'react'
import Header from '../header'
import { ThemeProvider } from 'styled-components'
import { theme, Global, Wrapper, SubWrapper, SideRainbow } from './elements'
import Footer from '../../components/footer'

const Layout = ({ children, siteTitle }) => (
  <ThemeProvider theme={theme}>
    <>
      <SideRainbow />
      <Global />
      <Wrapper>
        <Header siteTitle={siteTitle} />
        <SubWrapper>{children}</SubWrapper>
        <Footer/>
      </Wrapper>
    </>
  </ThemeProvider>
)

export default Layout
