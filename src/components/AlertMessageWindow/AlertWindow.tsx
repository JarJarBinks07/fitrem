import React from "react";
import { IonAlert } from "@ionic/react";

interface IProps {
  header?: string;
  subHeader?: string;
  message: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertWindow: React.FC<IProps> = ({ message, isOpen, setIsOpen }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      header=""
      subHeader=""
      message={message}
      buttons={["OK"]}
      onDidDismiss={() => {
        setIsOpen(false);
      }}
    ></IonAlert>
  );
};

export default AlertWindow;
