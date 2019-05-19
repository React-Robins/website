import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import ExternalLink from '@common/ExternalLink';

import { Section, Container } from '@components/global';

const Join = () => (
  <StaticQuery
    query={graphql`
      query {
        art_fast: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "chatting" }
        ) {
          childImageSharp {
            fluid(maxWidth: 760) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }

        art_learn: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "community" }
        ) {
          childImageSharp {
            fluid(maxWidth: 760) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }

        art_ideas: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "ideas" }
        ) {
          childImageSharp {
            fluid(maxWidth: 760) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <Section id="join" accent>
        <Container>
          <h1>Get Involved</h1>
          <Grid>
            <div>
              <h2>Connect Online</h2>
              <p>
                Want to be a part of a growing online community of women and
                non-binary React developers? Apply to be added to the React
                Ladies Slack.
              </p>

              <div>
                <Link to="/slack/">
                  {' '}
                  <Button>Join Slack</Button>
                </Link>
              </div>
            </div>

            <Art>
              <Img fluid={data.art_fast.childImageSharp.fluid} />
            </Art>
          </Grid>
          <Grid inverse>
            <Art>
              <Img fluid={data.art_learn.childImageSharp.fluid} />
            </Art>
            <div>
              <h2>Connect In Person</h2>
              <p>
                Join us on Meetup to be the first to hear about our upcoming
                events in New York City centered around JavaScript and other
                technologies within the React ecosystem.
              </p>

              <div>
                <ExternalLink href="http://meetup.com/React-Ladies">
                  <Button>Join Meetup</Button>
                </ExternalLink>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>
    )}
  />
);

const Button = styled.button`
  background-color: #82729b;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin-top: 1em;
  font-size: 16px;
  &:hover {
    background: #413a4c;
  }
  border-radius: 35px;
}
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 40px;
  text-align: right;
  align-items: center;
  justify-items: center;
  margin: 24px 0;

  ${props =>
    props.inverse &&
    `
    text-align: left;
    grid-template-columns: 2fr 3fr;
  `} h2 {
    margin-bottom: 16px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    margin-bottom: 96px;

    &:last-child {
      margin-bottom: 24px;
    }

    ${props =>
      props.inverse &&
      `
        ${Art} {
          order: 2;
        }
    `};
  }
`;

const Art = styled.figure`
  margin: 0;
  max-width: 380px;
  width: 100%;
`;

export default Join;
