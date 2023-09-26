import { StateStorage } from "zustand/middleware";
import { sqlService } from "../db";
import { AppState } from "../db/entities/AppState";
const getAppStateRepository = async () => {
  return sqlService.connection?.getRepository(AppState);
};

export class CustomSqliteStorage implements StateStorage {
  async getItem(name: string): Promise<string | null> {
    await sqlService.init();

    try {
      const res = await getAppStateRepository();
      const state = await res?.findOne({
        where: {
          id: name,
        },
      });

      if (!state) return null;

      console.log("before, getItem", state?.store);
      return state.store;
    } catch (error) {
      console.log("Error with SET_TIMEOUT_IN_GET_ITEM:", error);
      return null;
    }
  }

  async setItem(name: string, value: string): Promise<void> {
    console.log("before, setItem", value);
    try {
      const res = await getAppStateRepository();
      await res?.upsert(
        {
          id: name,
          store: value,
        },
        { conflictPaths: ["id"] }
      );
      console.log("********SET_ITEM: ", await res?.find({}));
    } catch (error) {
      console.log("Error with SET_ITEM", error);
    }
  }

  async removeItem(name: string): Promise<void> {
    await new Promise((resolve) => resolve(name)).then((res) => console.log(res));
  }
}
