import styled from 'styled-components'

export const Attendees = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  img {
    border-radius: 50%;
    margin-left: -4px;
    margin-top: -4px;
    text-indent: -9999px;
    height: 46px;
    width: 46px;
    height: auto;
    display: block;
    position: relative;
    :before {
      content: ' ';
      display: block;
      position: absolute;
      border-radius: 50%;
      left: 0;
      height: 46px;
      width: 100%;
      background-color: rgb(230, 230, 230);
    }
  }
  li {
    list-style: none;
  }
`

