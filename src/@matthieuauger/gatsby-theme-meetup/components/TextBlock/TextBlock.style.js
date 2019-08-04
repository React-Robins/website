import styled from 'styled-components';

const StyledTextBlock = styled.div`
  max-width: 55%;
  margin: auto;
  margin-top: 50px;
  font-size: 20px;
  line-height: 1.3em;
  margin-bottom: 50px;

  h2 {
    font-weight: normal;
    margin-bottom: 40px;
    text-align: center;
  }

  .text-block-content a {
    font-weight: bold;
    box-shadow: rgba(112, 66, 125, 0.4) 0px -5px 0px inset;
    transition: box-shadow 0.3s ease-in-out 0s;
  }

  .text-block-content a:hover {
    box-shadow: rgba(112, 66, 125, 0.4) 0px -28px 0px inset;
  }

  .call-to-action {
    margin-top: 50px;
    display: flex;
    padding: 0 60px;
  }

  .call-to-action a {
    margin: auto;
  }

  @media screen and (max-width: 600px) {
    max-width: none;
    padding: 30px;
    margin: 0;

    .call-to-action {
      width: 100%;
      padding: 0;
      margin: 0;
    }

    .call-to-action a {
      padding: 10px 35px;
      width: 100%;
      font-size: 1.1rem;
      text-align: center;
      line-height: 34px;
    }
  }
`;

export default StyledTextBlock;
