import { render } from "@testing-library/react";
import { TestProvider } from "./testUtils";

export const renderWithProviders = (children: React.ReactNode) => {
  return render(<TestProvider>{children}</TestProvider>);
};
