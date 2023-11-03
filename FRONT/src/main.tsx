import "./globals.css";

import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { PersistGate } from "redux-persist/integration/react";

import App from "./pages/App.tsx";
import store, { persistor } from "./config/store.ts";
import ThemeProvider from "./components/ThemeProvider/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
