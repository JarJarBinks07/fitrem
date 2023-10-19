import React, { useState } from "react";
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { checkmarkCircleOutline, pauseCircleOutline, playCircleOutline, reloadCircleOutline } from "ionicons/icons";
import { useCombineStates } from "../../../../store/useCombineStates";
import ISwiper from "swiper";

interface IProps {
  swiper: ISwiper;
  swiperTrackIndex: number;
  playStatus: boolean;
  playMode: "play" | "pause";
  disabledButtons: boolean;
  changeStatus: () => void;
  setPlayMode: (value: "play" | "pause") => void;
  setSwiperButtons: React.Dispatch<React.SetStateAction<boolean>>;
  setDisabledButtons: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const SwiperUserButtons: React.FC<IProps> = ({
  swiper,
  swiperTrackIndex,
  playStatus,
  playMode,
  disabledButtons,
  changeStatus,
  setSwiperButtons,
  setDisabledButtons,
  setPlayMode,
  setPlayStatus,
}) => {
  /////useCombineState/////
  const {
    timerStatusForTraining,
    timeAfterPauseForTraining,
    workIntervalForTraining,
    setTimerStatusForTraining,
    setTimeAfterPauseForTraining,
    setTimerDurationForTraining,
    setDoneExercises,
    unsetWhenDone,
  } = useCombineStates();

  /////Initial state/////
  const [workoutButton, setWorkoutButton] = useState(true);

  const pauseButtonHandler = () => {
    setTimerStatusForTraining("pause");
    setTimeAfterPauseForTraining();
    changeStatus();
  };

  const playButtonHandler = () => {
    if (timeAfterPauseForTraining) {
      setTimerDurationForTraining(timeAfterPauseForTraining);
    } else {
      /////value must be in milliseconds/////
      setTimerDurationForTraining(workIntervalForTraining * 1000);
    }
    setTimerStatusForTraining("running");
    changeStatus();
  };
  return (
    <div>
      <IonGrid className="swiper__grid_container">
        <IonRow className="swiper__grid_row">
          {workoutButton ? (
            <IonCol>
              <IonButton
                className="swiper__bar_btn"
                expand="block"
                onClick={() => {
                  setWorkoutButton(false);
                  setSwiperButtons(false);
                  setDisabledButtons(true);
                  setTimerStatusForTraining("running");
                }}
              >
                <div className="ion-text-uppercase">Start Workout</div>
              </IonButton>
            </IonCol>
          ) : (
            <>
              <IonCol>
                <IonButton
                  disabled={disabledButtons}
                  className="swiper__bar_btn"
                  expand="block"
                  onClick={timerStatusForTraining === "running" ? pauseButtonHandler : playButtonHandler}
                >
                  <IonIcon
                    className="swiper__bar_icon"
                    slot="end"
                    icon={playStatus ? pauseCircleOutline : playCircleOutline}
                    // icon={playStatus ? pauseOutline : playSharp}
                  ></IonIcon>
                  <div className="ion-text-uppercase">{playMode}</div>
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  disabled={disabledButtons}
                  className="swiper__bar_btn  swiper__bar_btn_done"
                  expand="block"
                  onClick={() => {
                    swiper.slideNext();

                    setDoneExercises(swiperTrackIndex, "done");

                    setPlayMode("play");
                    setPlayStatus(false);
                    setTimerStatusForTraining("pause");
                    unsetWhenDone();
                  }}
                >
                  <IonIcon className="swiper__bar_icon" slot="end" icon={checkmarkCircleOutline}></IonIcon>
                  {/* <IonIcon className="swiper__bar_icon" slot="end" icon={checkmarkOutline}></IonIcon> */}

                  <div className="ion-text-uppercase">Done</div>
                </IonButton>
              </IonCol>
            </>
          )}
          <IonCol>
            <IonButton
              disabled={disabledButtons}
              className="swiper__bar_btn"
              expand="block"
              onClick={() => {
                unsetWhenDone();
                setDoneExercises(swiperTrackIndex, "skipped");
              }}
            >
              {/* <IonIcon className="swiper__bar_icon" slot="end" icon={playForwardCircleOutline}></IonIcon> */}
              {/* <IonIcon className="swiper__bar_icon" slot="end" icon={playForward}></IonIcon> */}
              <IonIcon className="swiper__bar_icon" slot="end" icon={reloadCircleOutline}></IonIcon>

              <div className="ion-text-uppercase">Skip</div>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default SwiperUserButtons;
