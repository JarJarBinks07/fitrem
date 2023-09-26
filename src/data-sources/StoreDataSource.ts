import { TestEntity } from "../db/entities/TestEntity";
import { AppState } from "../db/entities/AppState";
import { Item1695050284142 } from "../db/migrations/1inite1";
import { Item1695471857674 } from "../db/migrations/5inite5";
import { DataSource } from "typeorm";
import sqliteConnection from "../database";

export default new DataSource({
  name: "userConnection",
  type: "capacitor",
  driver: sqliteConnection,
  database: "ionic-react-user",
  entities: [AppState],
  migrations: [Item1695050284142, Item1695471857674],
  logging: ["error", "query", "schema"],
  synchronize: false,
  migrationsRun: false,
});
