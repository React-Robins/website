import React from 'react'
import { Link } from 'gatsby'
import { FooterWrap } from './elements'

const Footer = () => {
  return (
    <FooterWrap>
      All React Robins community members should review and abide by our{' '}
      <Link to="/code-of-conduct"> Code of Conduct</Link>
      .
      <br />
      <br />
      Have a question? Check out our{' '}
      <a href="/faq" title="Frequently Asked Questions">
        FAQs
      </a>{' '}
      or Follow React Robins on{' '}
      <a href="https://twitter.com/ReactJSRobins" title="Follow us on Twitter">
        Twitter
      </a>
      <br />
      <br />
      This site is powered by{' '}
      <a href="https://www.netlify.com" title="Visit Netlify">
        Netlify
      </a>{' '}
      and was originally{' '}
      <span role="img" aria-label="fork">
        🍴
      </span>
      'd from{' '}
      <a href="https://www.queerjs.com" title="Visit QueerJS">
        QueerJS
      </a>
      .
      <br />
    </FooterWrap>
  )
}

export default Footer
