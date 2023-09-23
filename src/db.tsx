import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { DataSource } from "typeorm";
import { TestEntity } from "./db/entities/TestEntity";
import { AppState } from "./db/entities/AppState";
import { Item1695050284142 } from "./db/migrations/1inite1";
import { Item1695471857674 } from "./db/migrations/5inite5";
// import { Item21695050284142 } from "./db/migrations/2inite2";
// import { Item31695050284142 } from "./db/migrations/3inite3";
// import { Item41695050284142 } from "./db/migrations/4inite4";

export class SqlConnectionService {
  localForage: any;
  connection: DataSource | null = null;
  constructor() {}

  async configureNativeConnection() {
    try {
      Promise.all([
        await CapacitorSQLite.checkConnectionsConsistency({
          dbNames: [],
          openModes: [],
        }),
      ]);
    } catch (error) {
      console.log("Error with ConnectionsConsistency: ", error);
    }
    const sqlite = new SQLiteConnection(CapacitorSQLite);

    this.connection = new DataSource({
      type: "capacitor",
      database: "fitrem_db",
      driver: sqlite,
      migrationsTransactionMode: "none",
      logging: ["error", "query", "schema"],
      // entities: [],
      entities: [TestEntity, AppState],
      migrationsRun: true,
      // synchronize: true,
      migrations: [
        Item1695050284142,
        // Item21695050284142, Item31695050284142, Item41695050284142,
        Item1695471857674,
      ],
    });
    const con = await this.connection.initialize();
    return con;
  }
}
