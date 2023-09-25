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
      const sqlite = new SQLiteConnection(CapacitorSQLite);
      console.log("*************new SQLiteConnection: ", sqlite);
      const checkConnection = await CapacitorSQLite.checkConnectionsConsistency({
        dbNames: [],
        openModes: [],
      });
      console.log("*************checkConnection: ", checkConnection);
      const statusConnection = (await sqlite.isConnection("fitrem_db", false)).result;
      console.log("*************statusConnection: ", statusConnection);
      if (checkConnection.result && statusConnection) {
        console.log("*************retrieve Connection");
        return await sqlite.retrieveConnection("fitrem_db", false);
      } else {
        this.connection = new DataSource({
          type: "capacitor",
          database: "fitrem_db",
          driver: sqlite,
          migrationsTransactionMode: "none",
          logging: ["error", "query", "schema"],
          // entities: [],
          entities: [TestEntity, AppState],
          migrationsRun: true,
          // no effect with setItem
          // synchronize: true,
          migrations: [
            Item1695050284142,
            // Item21695050284142, Item31695050284142, Item41695050284142,
            Item1695471857674,
          ],
        });
        console.log("*************Create new connection");
        return await this.connection.initialize();
      }
    } catch (error) {
      console.log("Error in DB initialize: ", error);
    }
  }
}

// export class SqlConnectionService {
//   localForage: any;
//   connection: DataSource | null = null;
//   constructor() {}

//   async configureNativeConnection() {
//     try {
//       console.log("*************");
//       // Promise.all([
//       //   await CapacitorSQLite.checkConnectionsConsistency({
//       //     dbNames: [],
//       //     openModes: [],
//       //   }),
//       // ]);
//       const result = await CapacitorSQLite.checkConnectionsConsistency({
//         dbNames: [],
//         openModes: [],
//       });
//       console.log("Result: ", result);
//     } catch (error) {
//       console.log("Error with ConnectionsConsistency: ", error);
//     }

//     const sqlite = new SQLiteConnection(CapacitorSQLite);

//     this.connection = new DataSource({
//       type: "capacitor",
//       database: "fitrem_db",
//       driver: sqlite,
//       migrationsTransactionMode: "none",
//       logging: ["error", "query", "schema"],
//       // entities: [],
//       entities: [TestEntity, AppState],
//       migrationsRun: true,
//       // synchronize: true,
//       migrations: [
//         Item1695050284142,
//         // Item21695050284142, Item31695050284142, Item41695050284142,
//         Item1695471857674,
//       ],
//     });
//     return await this.connection.initialize();
//     // return con;
//   }
// }
