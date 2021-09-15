import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../components/Form/formSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});
