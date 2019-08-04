import styled from 'styled-components';

const StyledHeader = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  text-align: left;
  border-bottom: 1px solid #b3b3b3;
  padding-bottom: 20px;
  margin-bottom: 20px;

  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .app-name {
    font-family: 'IBM Plex Mono';
    font-size: 40px;
    font-weight: bold;
    line-height: 52px;
    margin-left: 50px;
  }

  .app-name-classic {
    color: !important #333333;
  }

  .app-name-highlight {
    color: #84729a;
  }

  img {
    width: 150px;
    margin-bottom: 0;
  }

  ul {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin-left: auto;
  }

  li {
    list-style: none;
    margin-left: 20px;
    font-size: 26px;
    font-weight: bold;
    line-height: 34px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;

    .logo {
      margin-bottom: 20px;
    }

    .app-name {
      font-size: 30px;
      font-weight: bold;
      line-height: 35px;
      margin-left: 10px;
    }

    ul {
      flex-direction: column;
      margin-block-start: 0;
      padding-inline-start: 0;
      -webkit-padding-start: 0;
      margin: 0;
      width: 100%;
    }

    li {
      margin-left: 0;
      margin-bottom: 10px;
    }

    li a {
      padding: 10px 20px;
      width: auto;
      font-size: 1.1rem;
      text-align: center;
    }
  }
`;

export default StyledHeader;
