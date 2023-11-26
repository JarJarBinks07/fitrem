import React, { useRef } from "react";
import ISwiper from "swiper";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./ModalMessageWindow.css";
import { arrowBack, chevronBack, pin, share, trash } from "ionicons/icons";
import { useCombineStates } from "../../../store/useCombineStates";

import "./ModalMessageWindow.css";

interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalMessageWindow: React.FC<IProps> = ({ isOpen, setIsOpen }) => {
  const { messages, setMessages, removeMessage, removeAllMessages, changeMessageStatus } = useCombineStates();
  const testMessage = {
    id: Date.now(),
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere minima sed doloribus unde consequuntur! Necessitatibus commodi facilis dolores quidem vitae minima, architecto, eum corporis fuga possimus harum, voluptatibus expedita eius?",
    status: false,
  };

  return (
    <IonModal className="modal-statistic" isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                setMessages(testMessage);
              }}
            >
              +
            </IonButton>
          </IonButtons>
          <IonButtons slot="start">
            <IonButton onClick={removeAllMessages}>Clear all</IonButton>
          </IonButtons>
          <IonTitle>Message</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* <IonList inset={true}> */}
        {messages.map((e) => (
          <div className="message__container" key={e.id}>
            <IonItemSliding>
              <IonItem
                button={true}
                detail={e.status}
                detailIcon={chevronBack}
                color={!e.status ? "success" : "default"}
                onClick={() => {
                  changeMessageStatus(e.id);
                }}
              >
                <IonLabel>{e.text}</IonLabel>
              </IonItem>
              <IonItemOptions slot="end">
                <IonItemOption disabled={!e.status} color="danger" expandable={true} onClick={() => removeMessage(e.id)}>
                  <IonIcon slot="icon-only" icon={trash}></IonIcon>
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </div>
        ))}
        {/* </IonList> */}
      </IonContent>
    </IonModal>
  );
};

export default ModalMessageWindow;
