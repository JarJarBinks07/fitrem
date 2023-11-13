import { StateStorage } from "zustand/middleware";
import { SqlConnectionService } from "../db/db";
import { AppState } from "../db/entities/AppState";

const getAppStateRepository = async () => {
  return SqlConnectionService.connection?.getRepository(AppState);
};

export class CustomSqliteStorage implements StateStorage {
  //Get
  async getItem(name: string): Promise<string | null> {
    console.log("START CONNECTION WITH STORAGE");
    await SqlConnectionService.initConnection();

    try {
      const res = await getAppStateRepository();
      const state = await res?.findOne({
        where: {
          id: name,
        },
      });

      if (!state) return null;

      console.log("GET_ITEM", state?.store);
      return state.store;
    } catch (error) {
      console.log("Error GET_ITEM:", error);
      return null;
    }
  }
  //Set
  async setItem(name: string, value: string): Promise<void> {
    try {
      const res = await getAppStateRepository();
      console.log("Before Error, getAppStateRepository find");
      await res?.upsert(
        {
          id: name,
          store: value,
        },
        // { conflictPaths: ["id"], skipUpdateIfNoValuesChanged: true }
        { conflictPaths: ["id"] }
      );
      console.log("***SET_ITEM: ", await res?.find({}));
    } catch (error) {
      console.log("Error with SET_ITEM", error);
    }
  }

  async removeItem(name: string): Promise<void> {
    await new Promise((resolve) => resolve(name)).then((res) => console.log(res));
  }
}
