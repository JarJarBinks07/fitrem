import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from "@ionic/react";

import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { useSQLiteDB } from "../../hooks/useSQLiteDB";
import { useConfirmationAlert } from "../../hooks/useConfirmationAlert";
import { SQLItem } from "../../types/types";
import MainMenu from "../../components/Menu/MainMenu";
import FooterButtons from "../../components/Footer/FooterButtons";
import { useCombineStates } from "../../store/useCombineStates";
import { SqlConnectionService } from "../../db";
import { ItemEntity } from "../../db/item";

const Home: React.FC = () => {
  // test for JSON sqlite
  const JSONFromState = JSON.stringify(useCombineStates());
  console.log("Combine States: ", JSONFromState);
  //store
  const [inputName, setInputName] = useState("");
  const [items, setItems] = useState<Array<SQLItem>>();

  // hook for sqlite db
  // const { performSQLAction, initialized } = useSQLiteDB();

  // hook for confirmation dialog
  const { showConfirmationAlert, ConfirmationAlert } = useConfirmationAlert();

  // useEffect(() => {
  //   loadData();
  // }, [initialized]);

  // existing data from the database
  // const loadData = async () => {
  //   try {
  //     // query db
  //     performSQLAction(async (db: SQLiteDBConnection | undefined) => {
  //       const respSelect = await db?.query(`SELECT * FROM test`);
  //       // console.log(respSelect?.values);
  //       setItems(respSelect?.values);
  //     });
  //   } catch (error) {
  //     alert((error as Error).message);
  //     setItems([]);
  //   }
  // };
  //typeorm
  const [state, saveState] = useState<ItemEntity[]>();

  const getData = async () => {
    const sqlConnectionService = new SqlConnectionService();
    await sqlConnectionService.configureNativeConnection();
    const res = sqlConnectionService.connection?.getRepository(ItemEntity);
    const data = await res?.find({});
    saveState(data);
  };

  useEffect(() => {
    getData();
  }, []);
  //

  // const addItem = async () => {
  //   try {
  //     // add test record to db
  //     performSQLAction(
  //       async (db: SQLiteDBConnection | undefined) => {
  //         await db?.query(`INSERT INTO test (id,JSON) values (?,?);`, [Date.now(), JSONFromState]);

  //         // update ui
  //         const respSelect = await db?.query(`SELECT * FROM test;`);
  //         setItems(respSelect?.values);
  //       },
  //       async () => {
  //         setInputName("");
  //       }
  //     );
  //   } catch (error) {
  //     alert((error as Error).message);
  //   }
  // };

  const addItem = async () => {
    try {
      const sqlConnectionService = new SqlConnectionService();

      const con = await sqlConnectionService.configureNativeConnection();
      const res = sqlConnectionService.connection?.getRepository(ItemEntity);
      await res?.save({
        id: Date.now().toString(),
        isActive: true,
        isActive2: false,
        name: inputName,
        jsonTest: JSON.stringify({
          id: Math.random(),
          nest: {
            nested: true,
          },
        }),
      });
      await getData();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const confirmDelete = (itemId: number) => {
    showConfirmationAlert("Are You Sure You Want To Delete This Item?", () => {
      deleteItem(itemId);
    });
  };

  // const deleteItem = async (itemId: number) => {
  //   try {
  //     // add test record to db
  //     performSQLAction(
  //       async (db: SQLiteDBConnection | undefined) => {
  //         await db?.query(`DELETE FROM test_db123 WHERE id=?;`, [itemId]);

  //         // update ui
  //         const respSelect = await db?.query(`SELECT * FROM test_db123;`);
  //         setItems(respSelect?.values);
  //       },
  //       async () => {
  //         setInputName("");
  //       }
  //     );
  //   } catch (error) {
  //     alert((error as Error).message);
  //   }
  // };

  return (
    <>
      <MainMenu />
      <IonPage id="main-content">
        <IonHeader>
          <IonHeader>
            <IonToolbar color="warning">
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Home</IonTitle>
            </IonToolbar>
          </IonHeader>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
          <IonItem>
            <IonInput
              type="text"
              value={inputName}
              onIonInput={(e) => setInputName(e.target.value as string)}
            ></IonInput>
            <IonButton slot="end" onClick={addItem} disabled={inputName.trim() === ""}>
              ADD
            </IonButton>
          </IonItem>

          <h3>THE SQLITE DATA</h3>

          {state?.map((e) => (
            <IonItem key={e?.id}>
              <IonLabel className="ion-text-wrap">{JSON.stringify(e)}</IonLabel>
              {/* <IonButton onClick={() => confirmDelete(e?.id)}>DELETE</IonButton> */}
            </IonItem>
          ))}

          {/* {items?.map((item) => (
            <IonItem key={item?.id}>
              <IonLabel className="ion-text-wrap">{item.name}</IonLabel>
              <IonLabel className="ion-text-wrap">{JSONFromState}</IonLabel>
              <IonButton onClick={() => confirmDelete(item.id)}>DELETE</IonButton>
            </IonItem>
          ))} */}

          {ConfirmationAlert}
        </IonContent>
        <FooterButtons />
      </IonPage>
    </>
  );
};

export default Home;
