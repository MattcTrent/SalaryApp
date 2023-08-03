import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import SystemParamModal from "./SystemParamModal";
import { Provider } from "react-redux";
import { systemParameterInitialState } from "../../../../Redux/Slices/SystemParameterSlice";

const middlewares: any = [];
const mockStore = configureStore(middlewares);
const initialState = {
  systemParameters: {
    SelectedSystemParameter: systemParameterInitialState,
  },
};
const store = mockStore(initialState);

const defaultComponent = (
  <Provider store={store}>
    <SystemParamModal modalAction="create" onClose={() => {}} />
  </Provider>
);

describe("System Parameter Modal", () => {
  test("Renders Create System Param", () => {
    render(defaultComponent);

    const titleElement = screen.getByText("Create System Parameter", {
      exact: false,
    });
    expect(titleElement).toBeInTheDocument();
  });
});
