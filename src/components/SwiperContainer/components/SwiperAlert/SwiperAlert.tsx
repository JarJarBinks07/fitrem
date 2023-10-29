import React from "react";
import { IonAlert } from "@ionic/react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalStatistic: React.Dispatch<React.SetStateAction<boolean>>;
};

function SwiperAlert({ isOpen, setIsOpen, setIsModalStatistic }: Props) {
  return (
    <IonAlert
      isOpen={isOpen}
      header=""
      subHeader="Keep it up"
      message="Let's check your result!"
      buttons={["OK"]}
      onDidDismiss={() => {
        setIsModalStatistic(true);
        setIsOpen(false);
      }}
    ></IonAlert>
  );
}
export default SwiperAlert;
