import { createGlobalStyle, css } from 'styled-components';

const globalStyles = css`
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

  * {
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }

  input {
    outline: none;
  }

  button {
    border: none;
  }
`;

const GlobalStyles = createGlobalStyle`${globalStyles}`;

export { GlobalStyles };
