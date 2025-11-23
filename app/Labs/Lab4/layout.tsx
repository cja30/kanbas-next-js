"use client";

import { Provider } from "react-redux";
import store from "../state";
import React from "react";

interface Lab4LayoutProps {
  children: React.ReactNode;
}

export default function Lab4Layout({ children }: Lab4LayoutProps) {
  return <Provider store={store}>{children}</Provider>;
}
