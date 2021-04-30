import React from 'react'
import { Link } from 'gatsby'
import { FooterWrap } from './elements'

const Footer = () => {
  return (
    <FooterWrap>
      We have a <Link to="/code-of-conduct"> Code of Conduct</Link>
      .
      <br />
      Follow React Ladies on{' '}
      <a href="https://twitter.com/reactjsladies" title="Follow us on Twitter">
        Twitter
      </a>
      <br />
      Website 🍴'd from
      <a href="https://www.queerjs.com" title="Visit QueerJS">
        QueerJS
      </a>
      <br />
    </FooterWrap>
  )
}

export default Footer
