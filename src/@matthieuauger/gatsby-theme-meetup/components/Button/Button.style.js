import styled from 'styled-components';

const StyledButton = styled.a`
  ${({ type }) => {
    const primaryColor = '#84729a';
    const lightGrey = '#4A4A4A';
    const strongGrey = '#333333';
    const lightColor = '#FCFCFC';

    const colorScheme = {
      primary: {
        borderColor: primaryColor,
        hoverBackgroundColor: primaryColor,
      },
      neutral: {
        borderColor: strongGrey,
        hoverBackgroundColor: strongGrey,
      },
    };
    return `
    {
      display: block;
      padding: 18px 48px;
      font-size: 1.3rem;
      font-weight: bold;
      color: ${lightGrey};
      text-decoration: none;
      border: 4px solid ${colorScheme[type].borderColor};
      box-shadow: none;
    }

    &:hover {
      background-color: ${colorScheme[type].hoverBackgroundColor};
      color: ${lightColor}; 
    }
  `;
  }};
`;

export default StyledButton;
