import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { initialState } from "../components/Form/formSlice";
import Form from "../components/Form";

const initialStateTest = {
  form: initialState,
};
const reducer = (state = initialStateTest, action) => state;
const store = createStore(reducer);

describe("Form", () => {
  test("renders Form component and checks for disabled button", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
    expect(screen.getByTestId("submit-button").disabled).toBeTruthy();
  });
});
