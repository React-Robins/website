import React from 'react'
import { Link } from 'gatsby'
import { FooterWrap } from './elements'

const Footer = () => {
  const site = {
    title: 'QueerJS',
    description: 'A meetup for everyone where Queer Speakers take the stage'
  }

  return (
    <FooterWrap>
      We have a{' '}
      <Link to="/code-of-conduct"> Code of Conduct</Link>
      .
      <br />
      <Link state={{ site: site }} to="/flags">
        What's with all the flags?
      </Link>
      <br />
      Follow QueerJS on{' '}
      <a href="https://twitter.com/queerjs" title="Follow us on Twitter">
        Twitter
      </a>
      <br />
      <br />
    </FooterWrap>
    )
}

export default Footer
