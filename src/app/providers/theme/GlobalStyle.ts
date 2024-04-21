import { createGlobalStyle, css } from 'styled-components';

const globalStyles = css`
  * {
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  button {
    border: none;
  }
`;

const GlobalStyles = createGlobalStyle`${globalStyles}`;

export { GlobalStyles };
