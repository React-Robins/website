import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import styled from 'styled-components'
import shuffle from '../helpers/shuffle'

const query = graphql`
  query MyQuery {
    allSanityAttendee {
      edges {
        node {
          id
          ghLink
          name
        }
      }
    }
  }
`

const Attendees = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  img {
    border-radius: 50%;
    margin-left: -4px;
  }
`

export default () => {
  const {allSanityAttendee: attendees} = useStaticQuery(query)
  return (
    <Attendees>
      {shuffle(attendees.edges).map(({node: a}) => (
        <li key={a.id}>
          <a href={`https://github.com/${a.ghLink}.png`} target='_blank' title={a.name}>
            <img src={`https://github.com/${a.ghLink}.png`} alt={a.name} width='50' />
          </a>
        </li>
      ))}
    </Attendees>
  )
}
