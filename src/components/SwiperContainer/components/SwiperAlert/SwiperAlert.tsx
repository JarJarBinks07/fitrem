import React from "react";
import { IonAlert } from "@ionic/react";

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setSwiperTrackIndex: (value: number) => void;
  setIsModalStatistic: React.Dispatch<React.SetStateAction<boolean>>;
}

const SwiperAlert: React.FC<IProps> = ({ isOpen, setIsOpen, setIsModalStatistic, setSwiperTrackIndex }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      header=""
      subHeader="Keep it up"
      message="Let's check your result!"
      buttons={["OK"]}
      onDidDismiss={() => {
        setIsModalStatistic(true);
        setSwiperTrackIndex(0);
        setIsOpen(false);
      }}
    ></IonAlert>
  );
};
export default SwiperAlert;
