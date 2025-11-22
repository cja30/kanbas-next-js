"use client";

import { Provider } from "react-redux";
import store from "../state";

export default function Lab4Layout({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
