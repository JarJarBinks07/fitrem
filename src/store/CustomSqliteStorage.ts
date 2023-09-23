import { StateStorage } from "zustand/middleware";
import { SqlConnectionService } from "../db";
import { AppState } from "../db/entities/AppState";

export class CustomSqliteStorage implements StateStorage {
  async getItem(name: string): Promise<string | null> {
    const value = await new Promise((resolve) => resolve(name)).then((res) => console.log("GET: ", res));
    return "GET DONE" || null;
  }
  async setItem(name: string, value: string): Promise<void> {
    const sqlConnectionService = await new SqlConnectionService();
    const con = await sqlConnectionService.configureNativeConnection();
    const res = await sqlConnectionService.connection?.getRepository(AppState);
    const item = await res?.save({
      id: Date.now().toString(),
      store: JSON.stringify(value),
    });
  }
  async removeItem(name: string): Promise<void> {
    await new Promise((resolve) => resolve(name)).then((res) => console.log(res));
  }
}

// const addItem = async () => {

//   const sqlConnectionService = new SqlConnectionService();
//   const con = await sqlConnectionService.configureNativeConnection();
//   const res = sqlConnectionService.connection?.getRepository(StoreEntity);
//   const item = await res?.save({
//     id: Date.now().toString(),
//   });
//   await getData();
// };

// import { StateStorage } from "zustand/middleware";

// export class CustomSqliteStorage implements StateStorage {
//   async getItem(name: string): Promise<string | null> {
//     const value = await new Promise((resolve) => resolve(name)).then((res) => console.log("GET: ", res));
//     return value || null;
//   }
//   async setItem(name: string, value: string): Promise<void> {
//     await new Promise((resolve) => resolve(value)).then((res) => console.log("SET: ", res));
//   }
//   async removeItem(name: string): Promise<void> {
//     await new Promise((resolve) => resolve(name)).then((res) => console.log(res));
//   }
// }
