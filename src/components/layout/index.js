import React from 'react'
import Header from '../header'
import { ThemeProvider } from 'styled-components'
import { theme, Global, Wrapper, SubWrapper } from './elements'
import Footer from '../../components/footer'

const Layout = ({ children, siteTitle }) => (
  <ThemeProvider theme={theme}>
    <>
      <Global />
      <Wrapper>
        <Header siteTitle={siteTitle} />
        <SubWrapper>{children}</SubWrapper>
        <Footer />
      </Wrapper>
    </>
  </ThemeProvider>
)

export default Layout
