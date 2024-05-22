import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator, Theme, ThemeProvider } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';

Amplify.configure(outputs);

const theme: Theme = {
  name: 'button-theme',
  tokens: {
    components: {
      button: {
        // backgroundColor: { value: '#f1fff5' },
        borderColor: { value: '{colors.teal.80}' },
        color: { value: '{colors.neutral.20}' },
        outlined: {
          info: {
            borderColor: '{colors.teal.60}',
            color: '{colors.neutral.20}',
          },
        },

        // style the primary variation
        primary: {
          backgroundColor: { value: '{colors.teal.60}' },
          _hover: {
            backgroundColor: { value: '{colors.teal.80}' },
          },
          _focus: {
            backgroundColor: { value: '{colors.teal.80}' },
          },
          _active: {
            backgroundColor: { value: '{colors.teal.90}' },
          },
          _disabled: {
            backgroundColor: { value: 'transparent' },
            borderColor: { value: '{colors.neutral.30}' },
          },
          error: {
            backgroundColor: { value: '{colors.pink.10}' },
            color: { value: '{colors.red.80}' },
            _hover: {
              backgroundColor: { value: '#a51b34' },
            },
            _focus: {
              backgroundColor: { value: '#9a0c26' },
            },
            _active: {
              backgroundColor: { value: '#9a0c26' },
            },
          },
        },
      },
      dropzone: {
        backgroundColor: { value: '#252525' },
        borderColor: '{colors.primary.80}',
      },
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Authenticator.Provider>
    <ThemeProvider theme={theme} colorMode="dark">
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Authenticator.Provider>
);
