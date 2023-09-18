import React from "react";
import { IonAlert } from "@ionic/react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function TimerConfirmationSettings({ isOpen, setIsOpen }: Props) {
  return (
    <IonAlert
      isOpen={isOpen}
      header=""
      subHeader="Nice choice"
      message="Let's do it!"
      buttons={["OK"]}
      onDidDismiss={() => {
        setIsOpen(false), history.back();
      }}
    ></IonAlert>
  );
}
export default TimerConfirmationSettings;
