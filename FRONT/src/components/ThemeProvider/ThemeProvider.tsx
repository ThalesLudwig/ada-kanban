import "react-toastify/dist/ReactToastify.css";

import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  ThemeProvider as StyledProvider,
  createGlobalStyle,
} from "styled-components";

import theme from "../../config/theme";
import { RootState } from "../../config/store";

type ConnectedThemeType = { children: ReactNode };

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    font-family: Poppins, Segoe UI, Roboto, Helvetica Neue, sans-serif;
    color-scheme: light dark;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
  }
`;

const ThemeProvider = ({ children }: ConnectedThemeType) => {
  const { isDarkMode } = useSelector((store: RootState) => store.theme);

  return (
    <StyledProvider theme={isDarkMode ? theme.dark : theme.light}>
      <GlobalStyle />
      <ToastContainer
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme={isDarkMode ? "dark" : "light"}
      />
      {children}
    </StyledProvider>
  );
};

export default ThemeProvider;
