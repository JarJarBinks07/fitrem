import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { createConnection, DataSource } from "typeorm";
import { ItemEntity } from "./db/item";
import { Item1695050284142 } from "./db/migrations/1inite1";
import { Item21695050284142 } from "./db/migrations/2inite2";
import { Item31695050284142 } from "./db/migrations/3inite3";
import { Item41695050284142 } from "./db/migrations/4inite4";

export class SqlConnectionService {
  localForage: any;
  connection: DataSource | null = null;
  constructor() {}

  async configureNativeConnection() {
    try {
      await CapacitorSQLite.checkConnectionsConsistency({
        dbNames: [],
        openModes: [],
      });
    } catch (error) {
      console.log("Error with ConnectionsConsistency: ", error);
    }
    const sqlite = new SQLiteConnection(CapacitorSQLite);

    this.connection = new DataSource({
      type: "capacitor",
      database: "test_db123",
      driver: sqlite,
      migrationsTransactionMode: "none",
      logging: ["error", "query", "schema"],
      entities: [ItemEntity],
      migrationsRun: true,
      synchronize: true,
      migrations: [Item1695050284142, Item21695050284142, Item31695050284142, Item41695050284142],
    });
    const con = await this.connection.initialize();
    return con;
  }
}
