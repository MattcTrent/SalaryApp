import { render, screen } from "@testing-library/react";
import { SystemParameterTable } from "./SystemParameterTable";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const middlewares: any = [];
const mockStore = configureStore(middlewares);
const initialState = {
  systemParameters: {
    SystemParameters: [],
  },
};
const store = mockStore(initialState);

const defaultComponent = (
  <Provider store={store}>
    <SystemParameterTable />
  </Provider>
);

describe("System Parameter Table Tests ", () => {
  test("gets all Parameters ", async () => {
    // seems to be failing as nothing is returned, may need to find a better way to mock the response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              parameterGroup: "Tax",
              name: "Test",
              rate: 20,
              lowerThreshold: 12570,
              upperThreshold: 50570,
            },
          ]),
      }),
    ) as jest.Mock;

    render(defaultComponent);

    const tableRows = await screen.findAllByRole("SalaryTableRow");
    console.log(tableRows);
    expect(tableRows).not.toHaveLength(0);
  });
});
