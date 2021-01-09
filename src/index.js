// import "core-js/stable";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/Theme";
import store from "./store";
import App from "./components/layout/App";

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <GlobalStyles theme={theme} />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </CookiesProvider>,
  document.querySelector("#root")
);
