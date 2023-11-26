import React from "react";
import { IonAlert } from "@ionic/react";

interface IProps {
  subHeader: string;
  message: string;
  isOpen: boolean;
  onComplete: () => void;
}

const AlertWindow: React.FC<IProps> = ({ subHeader, message, isOpen, onComplete }) => {
  return (
    <IonAlert isOpen={isOpen} subHeader={subHeader} message={message} buttons={["OK"]} onDidDismiss={onComplete}></IonAlert>
  );
};

export default AlertWindow;
