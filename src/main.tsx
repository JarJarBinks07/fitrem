import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Capacitor } from "@capacitor/core";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const platform = Capacitor.getPlatform();

    // Only for web
    if (platform === "web") {
      console.log("Start of initialization IndexedDB");
      const sqlite = new SQLiteConnection(CapacitorSQLite);
      // Create the 'jeep-sqlite' custom component
      customElements.define("jeep-sqlite", JeepSqlite);
      const jeepSqliteEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepSqliteEl);
      await customElements.whenDefined("jeep-sqlite");
      // Initialize the Web store
      await sqlite.initWebStore();
      console.log("End of initialization IndexedDB");
    }

    const container = document.getElementById("root");
    const root = createRoot(container!);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (e) {
    console.log(e);
  }
});
