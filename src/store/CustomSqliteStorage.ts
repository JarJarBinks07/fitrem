import { StateStorage } from "zustand/middleware";
import { SqlConnectionService } from "../db";
import { AppState } from "../db/entities/AppState";

const getRepository = async () => {
  const sqlConnectionService = new SqlConnectionService();
  const con = await sqlConnectionService.configureNativeConnection();
  return await sqlConnectionService.connection?.getRepository(AppState);
};

export class CustomSqliteStorage implements StateStorage {
  async getItem(name: string): Promise<string | null> {
    //add setTimeout for resolving problem with jeepSQLite when rerendering starts
    setTimeout(async () => {
      const value = await new Promise(async (resolve) => {
        const res = await getRepository();
        const data = await res?.find({});
        resolve(data);
      }).then((res) => console.log(res));
    }, 1000);
  }
  async setItem(name: string, value: string): Promise<void> {
    try {
      const res = await getRepository();
      if (res) {
        const dataID = (await res.find({}))[0]?.id;
        if (dataID) {
          console.log("dataID: ", dataID);
          let getItem = await res.findOne({ where: { id: dataID } });
          console.log("Before getItem:", getItem);
          if (getItem) {
            getItem.store = JSON.stringify(value);
            console.log("AFTER getItem:", getItem);
            await res.save(getItem);
          } else {
            console.log("Error with getItem");
          }
        } else {
          console.log("******First record*********");
          await res.save({
            id: Date.now().toString(),
            store: JSON.stringify(value),
          });
        }
      }
      console.log(await res?.find({}));
    } catch (error) {
      console.log("Error with saving JSON data store", error);
    }
  }

  async removeItem(name: string): Promise<void> {
    await new Promise((resolve) => resolve(name)).then((res) => console.log(res));
  }
}
