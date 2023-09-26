import "reflect-metadata";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const container = document.getElementById("root");
    const root = createRoot(container!);
    root.render(
      // <React.StrictMode>
      <App />
      // </React.StrictMode>
    );
  } catch (e) {
    console.log(e);
  }
});
