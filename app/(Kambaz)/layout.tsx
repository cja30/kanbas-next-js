"use client";

import { Provider } from "react-redux";
import store from "./store";
import Navigation from "./Navigation";
import "./styles.css";
import Session from "./Account/Session";

export default function KambazLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Session>
        <div id="wd-kambaz">
          <Navigation />
          <div className="wd-main-content-offset p-3">{children}</div>
        </div>
      </Session>
    </Provider>
  );
}
