import React from 'react';
import styled from 'styled-components';

const StyledMeetup = styled.div`
  ${props => `
    background-color: ${props.backgroundColor};
  `};
  padding-top: 15px;
  padding-bottom: 30px;

  .meetup-informations {
    display: flex;
    margin-bottom: 20px;
    font-size: 24px;
    line-height: 32px;
  }

  .meetup-name {
    padding: 30px;
  }

  .meetup-name h2 {
    text-align: center;
    margin: 0;
  }

  .meetup-informations-basic {
    width: 35%;
    border-right: 1px solid #b3b3b3;
  }

  .meetup-informations-basic-highlight {
    font-weight: bold;
  }

  .meetup-informations-basic-date {
    width: 70%;
    margin: auto;
    margin-bottom: 30px;
  }

  .meetup-informations-basic-place {
    width: 70%;
    margin: auto;
  }

  .meetup-informations-talks {
    width: 55%;
    margin: auto;
  }

  .meetup-informations-talks a {
    font-weight: bold;
    box-shadow: rgba(112, 66, 125, 0.4) 0px -5px 0px inset;
    transition: box-shadow 0.3s ease-in-out 0s;
  }

  .meetup-informations-talks a:hover {
    box-shadow: rgba(112, 66, 125, 0.4) 0px -28px 0px inset;
  }

  .meetup-subscribe {
    display: flex;
    padding: 0 60px;
  }

  .meetup-subscribe a {
    margin-left: auto;
  }

  @media screen and (max-width: 600px) {
    padding: 0 30px 30px;
    margin-bottom: 0;

    .meetup-informations {
      flex-direction: column;
      margin-bottom: 0;
    }

    .meetup-informations-basic {
      width: auto;
      border-right: none;
    }

    .meetup-informations-basic-date {
      width: auto;
      border-bottom: 1px solid #b3b3b3;
      padding-bottom: 20px;
    }

    .meetup-informations-basic-place {
      width: auto;
      border-bottom: 1px solid #b3b3b3;
      padding-bottom: 20px;
    }

    .meetup-informations-talks {
      width: auto;
    }

    .meetup-informations-talks p {
      word-break: break-word;
      border-bottom: 1px solid #b3b3b3;
      padding-bottom: 20px;
    }

    .meetup-subscribe {
      width: 100%;
      padding: 0;
    }

    .meetup-subscribe a {
      padding: 10px 20px;
      width: 100%;
      font-size: 1.1rem;
      text-align: center;
      line-height: 34px;
    }
  }
`;

export default props => <StyledMeetup {...props} />;
