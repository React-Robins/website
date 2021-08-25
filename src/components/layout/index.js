import React from 'react'
import Header from '../header'
import { ThemeProvider } from 'styled-components'
import { theme, Global, Wrapper, SubWrapper } from './elements'
import Footer from '../../components/footer'
import Announcement from '../../components/Announcement'
const Layout = ({ children, siteTitle }) => (
  <ThemeProvider theme={theme}>
    <>
      <Announcement
        message={{
          heading: 'Introducing React Robins',
          text: "In order to create a more inclusive environment, we've changed our name from React Ladies to React Robins."
        }}
      />
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
