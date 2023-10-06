import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
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
  IonImg,
} from "@ionic/react";
import { createConnection, DataSource } from "typeorm";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { useSQLiteDB } from "../../hooks/useSQLiteDB";
import { useConfirmationAlert } from "../../hooks/useConfirmationAlert";
import { SQLItem } from "../../types/types";
import MainMenu from "../../components/Menu/ProfileMenu";
import FooterButtons from "../../components/Footer/FooterButtons";
import { useCombineStates } from "../../store/useCombineStates";
import { SqlConnectionService } from "../../db";
import { TestEntity } from "../../db/entities/TestEntity";
import {
  removeTrack,
  readBlob64File,
  saveTrack,
  writeBlob64File,
  readStoredFile,
  base64FromPath,
} from "../../settings/capacitor.storage";
import { AppState } from "../../db/entities/AppState";

const Home: React.FC = () => {
  // const path =
  //   "https://png.pngtree.com/png-vector/20191121/ourmid/pngtree-big-and-small-palm-trees-on-sand-illustration-vector-on-white-png-image_2013172.jpg";
  const fileName = "track.mp4";
  const path = "/assets/icons/Step_jacks_wo_bounce0030-0150.mp4";
  // const fileName = "track.gif";
  // const path = "/assets/icons/Step_jacks.gif";

  // const fileName = "redman.png";
  // const path = "/assets/icons/redman.png";
  const [media, setMedia] = useState();
  useEffect(() => {
    // writeBlob64File(path, fileName);
    // readBlob64File(fileName).then((res) => setMedia(res?.data));
  }, []);
  // console.log("Media: ", media);
  const readTrack = () => readStoredFile(fileName).then((res) => setMedia(res));
  // console.log(media);

  // function convertBase64toURL(base64: Uint8Array, format: string) {
  //   const imageData = new Uint8Array(base64);
  //   const blob = new Blob([imageData], { type: `${format}` });
  //   return URL.createObjectURL(blob);
  // }
  // const imageData = new Uint8Array(media);
  // const blob = new Blob([imageData], { type: "video/mp4" });
  // const blob = new Blob([imageData], { type: "image/jpeg" });
  // const dataUri = URL.createObjectURL(blob);
  // console.log(dataUri);

  // test for JSON sqlite
  // const JSONFromState = JSON.stringify(useCombineStates());
  // console.log("Combine States: ", JSONFromState);
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
  const [state, saveState] = useState<TestEntity[]>();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = SqlConnectionService.connection?.getRepository(TestEntity);
    const data = await res?.find({});
    saveState(data);
  };
  // console.log(state);

  // const addItem = async () => {
  //   try {
  //     const sqlConnectionService = new SqlConnectionService();
  //     const con = await sqlConnectionService.configureNativeConnection();
  //     const res = sqlConnectionService.connection?.getRepository(TestEntity);
  //     await res?.save({
  //       id: Date.now().toString(),
  //       isActive: true,
  //       isActive2: false,
  //       name: inputName,
  //       jsonTest: JSON.stringify({
  //         id: Math.random(),
  //         nest: {
  //           nested: true,
  //         },
  //       }),
  //     });
  //     await getData();
  //   } catch (error) {
  //     alert((error as Error).message);
  //   }
  // };
  const itemUrl = "https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png";
  const itemVideoUrl = path;

  const addItem = async () => {
    const response = await axios.request({
      url: itemVideoUrl,
      method: "get",
      responseType: "arraybuffer",
    });
    const res = SqlConnectionService.connection?.getRepository(TestEntity);
    const item = await res?.save({
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
      file: Buffer.from(response.data).toString("base64"),
    });
    // console.log(item);
    // console.log(response.data.toString("base64"));
    // console.log(Buffer.from(response.data).toString("base64"));
    // await getData();
    const data = await res?.find({});
    saveState(data);
  };

  const upDateItem = async (id: string) => {
    try {
      const res = SqlConnectionService.connection?.getRepository(TestEntity);
      if (res) {
        const getItem = await res.findOne({ where: { id: id } });
        if (getItem) {
          getItem.name = inputName;
          await res.save(getItem);
        } else {
          console.log("can't rename input:", getItem!.id);
        }
      } else {
        console.log("Connection to DB is absent");
      }
      await getData();
    } catch (error) {
      alert((error as Error).message);
    }
  };
  const DeleteDateItem = async (id: string) => {
    try {
      const res = SqlConnectionService.connection?.getRepository(TestEntity);
      if (res) {
        const getItem = await res.findOne({ where: { id: id } });
        if (getItem) {
          await res.remove(getItem);
        } else {
          console.log("can't rename input:", getItem!.id);
        }
      } else {
        console.log("Connection to DB is absent");
      }
      //
      const data = await res?.find({});
      saveState(data);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  // const confirmDelete = (itemId: number) => {
  //   showConfirmationAlert("Are You Sure You Want To Delete This Item?", () => {
  //     deleteItem(itemId);
  //   });
  // };

  return (
    <>
      {/* <MainMenu /> */}
      <IonPage id="profile">
        <IonHeader>
          <IonToolbar color="warning">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className="ion-padding">
          <IonItem>
            {/* <IonImg src={"data:image/gif;base64, " + media} alt="img" className="test-image" /> */}
            <iframe
              width="560"
              height="315"
              // src={"data:image/png;base64, " + media}
              src={"data:video/mp4;base64, " + media}
              // src={"data:image/gif;base64, " + media}
              title="TestFitRem"
              allowFullScreen
            />
          </IonItem>
          <IonItem>
            <IonInput
              type="text"
              value={inputName}
              onIonInput={(e) => setInputName(e.target.value as string)}
            ></IonInput>
            <IonButton slot="end" onClick={addItem} disabled={inputName.trim() === ""}>
              ADD
            </IonButton>
            <IonButton slot="end" onClick={() => saveTrack(path, fileName)}>
              ADD TRACK
            </IonButton>
            <IonButton slot="end" onClick={() => removeTrack(fileName)}>
              DELETE
            </IonButton>
            <IonButton slot="end" onClick={readTrack}>
              READ
            </IonButton>
          </IonItem>

          <h3>THE SQLITE DATA</h3>

          {state?.map((e) => (
            <IonItem key={e?.id}>
              <iframe
                width="300"
                height="315"
                // src={"data:image/png;base64, " +  e.file}
                // src={"data:video/mp4;base64, " + e.file}
                src={"data:video/mp4;base64, " + e.file}
                title="TestFitRem"
                allowFullScreen
              />
              {/* {e.file && <IonImg src={"data:image/gif;base64, " + e.file} className="test-image" />} */}
              {/* {e.file && <IonImg src={"data:video/mp4;base64, " + e.file} />} */}
              {/* <IonLabel className="ion-text-wrap">{JSON.stringify(e)}</IonLabel> */}

              <IonButton onClick={() => DeleteDateItem(e?.id)}>DELETE</IonButton>
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
        {/* <FooterButtons /> */}
      </IonPage>
    </>
  );
};

export default Home;
