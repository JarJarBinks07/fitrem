import { StateStorage } from "zustand/middleware";
import { SqlConnectionService } from "../db";
import { AppState } from "../db/entities/AppState";

const getRepository = async () => {
  const sqlConnectionService = new SqlConnectionService();
  const con = await sqlConnectionService.configureNativeConnection();
  return sqlConnectionService.connection?.getRepository(AppState);
};

const getData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await getRepository();
      const data = await res?.find({});
      if (!data) {
        throw new Error("Error with GET_DATA");
      }
      resolve(JSON.parse(data[0].store));
    } catch (error) {
      reject(error);
    }
  });
};

export class CustomSqliteStorage implements StateStorage {
  async getItem(name: string): Promise<string | null> {
    //add setTimeout for resolving problem with jeepSQLite when rerendering starts

    setTimeout(async () => {
      try {
        const result = await getData();
        console.log("**********GET_ITEM:", result);
        return result;
      } catch (error) {
        console.log("Error with SET_TIMEOUT_IN_GET_ITEM:", error);
      }
    }, 1000);
  }

  //   setTimeout(async () => {
  //     try {
  //       const res = await getRepository();
  //       const data = await res?.find({});
  //       if (!data) {
  //         throw new Error("Error with method GET_ITEM");
  //       }
  //       console.log(JSON.parse(data[0].store));
  //       return JSON.parse(data[0].store);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, 1000);
  // }

  // const getData = async () => {
  //     try {
  //       const res = await getRepository();
  //       const data = await res?.find({});
  //       if (!data) {
  //         throw new Error("Error with method GET_ITEM");
  //       }
  //       console.log(JSON.parse(data[0].store));
  //       return JSON.parse(data[0].store);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getData();
  // }
  async setItem(name: string, value: string): Promise<void> {
    try {
      const res = await getRepository();
      if (res) {
        const dataID = (await res.find({}))[0]?.id;
        let getItem = await res.findOne({ where: { id: dataID } });
        if (getItem) {
          getItem = { ...getItem, store: JSON.stringify(value) };
          await res.save(getItem);
        } else {
          console.log("******First record*********");
          await res.save({
            id: Date.now().toString(),
            store: JSON.stringify(value),
          });
        }
      }
      console.log("********SET_ITEM: ", await res?.find({}));
    } catch (error) {
      console.log("Error with SET_ITEM", error);
    }
  }

  async removeItem(name: string): Promise<void> {
    await new Promise((resolve) => resolve(name)).then((res) => console.log(res));
  }
}
