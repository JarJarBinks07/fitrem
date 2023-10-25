import { useEffect, useRef, useState } from "react";
import { SQLiteDBConnection, SQLiteConnection, CapacitorSQLite } from "@capacitor-community/sqlite";

export const useSQLiteDB = () => {
  const db = useRef<SQLiteDBConnection>();
  const sqlite = useRef<SQLiteConnection>();
  const [initialized, setInitialized] = useState<boolean>(false);

  const initializeDB = async () => {
    if (sqlite.current) return;

    sqlite.current = new SQLiteConnection(CapacitorSQLite);
    const checkConnection = await sqlite.current.checkConnectionsConsistency();
    const statusConnection = (await sqlite.current.isConnection("fitrem_db", false)).result;

    if (checkConnection.result && statusConnection) {
      db.current = await sqlite.current.retrieveConnection("fitrem_db", false);
    } else {
      db.current = await sqlite.current.createConnection(
        "fitrem_db",
        false,
        "no-encryption",
        1,
        false
      );
    }
  };

  const performSQLAction = async (
    action: (db: SQLiteDBConnection | undefined) => Promise<void>,
    cleanup?: () => Promise<void>
  ) => {
    try {
      await db.current?.open();
      await action(db.current);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      try {
        (await db.current?.isDBOpen())?.result && (await db.current?.close());
        cleanup && (await cleanup());
      } catch {}
    }
  };
  const initializeTables = async () => {
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const queryCreateTable = `
      CREATE TABLE IF NOT EXISTS test (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
      );
    `;
      const respCT = await db?.execute(queryCreateTable);
      // console.log(`res: ${JSON.stringify(respCT)}`);
    });
  };

  useEffect(() => {
    initializeDB().then(() => {
      initializeTables();
      setInitialized(true);
    });
  }, []);

  return { performSQLAction, initialized };
};
