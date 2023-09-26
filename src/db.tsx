import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { DataSource, LoggerOptions } from "typeorm";
import { TestEntity } from "./db/entities/TestEntity";
import { AppState } from "./db/entities/AppState";
import { Item1695050284142 } from "./db/migrations/1inite1";
import { Item1695471857674 } from "./db/migrations/5inite5";
import { Capacitor } from "@capacitor/core";
import initSqlite from "sql.js";

const sharedDbSettings = {
  entities: [TestEntity, AppState],
  migrations: [Item1695050284142, Item1695471857674],
  migrationsRun: true,
  logging: ["error", "query", "schema"] as LoggerOptions,
};
class SqlConnectionService {
  static dbName = "fitrem_db";
  static instance: SqlConnectionService;
  static connection: DataSource | null = null;
  static localForage: LocalForage;

  static async configureConnection(sqlite: SQLiteConnection) {
    try {
      await CapacitorSQLite.checkConnectionsConsistency({
        dbNames: [],
        openModes: [],
      });
    } catch (e) {}
    try {
      SqlConnectionService.connection = new DataSource({
        type: "capacitor",
        database: SqlConnectionService.dbName,
        driver: sqlite,
        migrationsTransactionMode: "none",
        ...sharedDbSettings,
      });
      return await SqlConnectionService.connection.initialize();
    } catch (error) {
      console.log("Error in DB initialize: ", error);
    }
  }

  static async initLocalForage() {
    const localForageImport = await import("localforage");
    SqlConnectionService.localForage = localForageImport.default;
    (window as any).localforage = SqlConnectionService.localForage;
  }

  static async initSqlJs() {
    const res = await initSqlite({
      locateFile: (file: string) => `/static/assets/sql.js/${file}`,
    });
    (window as any).SQL = res;
  }

  static configureNativeConnection() {
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    SqlConnectionService.connection = new DataSource({
      type: "capacitor",
      database: SqlConnectionService.dbName,
      driver: sqlite,
      migrationsTransactionMode: "none",
      ...sharedDbSettings,
    });
    return SqlConnectionService.connection;
  }

  static configureWebConnection() {
    SqlConnectionService.localForage.config({
      description: "quest",
      driver: SqlConnectionService.localForage.INDEXEDDB,
    });
    SqlConnectionService.connection = new DataSource({
      type: "sqljs",
      autoSave: true,
      location: SqlConnectionService.dbName,
      useLocalForage: true,
      ...sharedDbSettings,
    });
    return SqlConnectionService.connection;
  }

  static async init() {
    if (SqlConnectionService.connection) return;

    await SqlConnectionService.initLocalForage();
    await SqlConnectionService.initSqlJs();
    let connection;
    if (Capacitor.getPlatform() === "web") {
      connection = SqlConnectionService.configureWebConnection();
    } else {
      connection = SqlConnectionService.configureNativeConnection();
    }

    await connection?.initialize();
  }
}

export const sqlService = SqlConnectionService;
