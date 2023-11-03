import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PersistGate } from "redux-persist/integration/react";

import ThemeProvider from "../components/ThemeProvider/ThemeProvider";
import store, { persistor } from "./store.ts";

type Props = { children: React.ReactNode };

export const TestProvider: React.FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <DndProvider backend={HTML5Backend}>{children}</DndProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
