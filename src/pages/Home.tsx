import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { useSQLiteDB } from "../hooks/useSQLiteDB";
import { useConfirmationAlert } from "../hooks/useConfirmationAlert";
import { SQLItem } from "../types/types";

const Home: React.FC = () => {
  // const [editItem, setEditItem] = useState<any>();
  const [inputName, setInputName] = useState("");
  const [items, setItems] = useState<Array<SQLItem>>();

  // hook for sqlite db
  const { performSQLAction, initialized } = useSQLiteDB();

  // hook for confirmation dialog
  const { showConfirmationAlert, ConfirmationAlert } = useConfirmationAlert();

  useEffect(() => {
    loadData();
  }, [initialized]);

  // existing data from the database
  const loadData = async () => {
    try {
      // query db
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM test`);
        console.log(respSelect?.values);
        setItems(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setItems([]);
    }
  };

  const addItem = async () => {
    try {
      // add test record to db
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`INSERT INTO test (id,name) values (?,?);`, [Date.now(), inputName]);

          // update ui
          const respSelect = await db?.query(`SELECT * FROM test;`);
          setItems(respSelect?.values);
        },
        async () => {
          setInputName("");
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const confirmDelete = (itemId: number) => {
    showConfirmationAlert("Are You Sure You Want To Delete This Item?", () => {
      deleteItem(itemId);
    });
  };

  const deleteItem = async (itemId: number) => {
    try {
      // add test record to db
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`DELETE FROM test WHERE id=?;`, [itemId]);

          // update ui
          const respSelect = await db?.query(`SELECT * FROM test;`);
          setItems(respSelect?.values);
        },
        async () => {
          setInputName("");
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>TEST</IonTitle>
        </IonToolbar>
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

        {items?.map((item) => (
          <IonItem key={item?.id}>
            <IonLabel className="ion-text-wrap">{item.name}</IonLabel>
            <IonButton onClick={() => confirmDelete(item.id)}>DELETE</IonButton>
          </IonItem>
        ))}

        {ConfirmationAlert}
      </IonContent>
    </IonPage>
  );
};

export default Home;
