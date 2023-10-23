import React, { useEffect, useState } from "react";
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { checkmarkCircleOutline, pauseCircleOutline, playCircleOutline, reloadCircleOutline } from "ionicons/icons";
import { useCombineStates } from "../../../../store/useCombineStates";
import ISwiper from "swiper";
import _ from "lodash";

interface IProps {
  swiper: ISwiper;
  swiperTrackIndex: number;
  playStatus: boolean;
  playMode: "play" | "pause";
  changeStatus: () => void;
  setPlayMode: (value: "play" | "pause") => void;
  setPlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const SwiperUserButtons: React.FC<IProps> = ({
  swiper,
  swiperTrackIndex,
  playStatus,
  playMode,
  changeStatus,
  setPlayMode,
  setPlayStatus,
}) => {
  /////useCombineState/////
  const {
    timerStatusForTraining,
    timeAfterPauseForTraining,
    workIntervalForTraining,
    userTraining,
    passedExercises,
    disabledMainButtonsExceptTraining,
    setTimerStatusForTraining,
    setTimeAfterPauseForTraining,
    setTimerDurationForTraining,
    setPassedExercises,
    unsetWhenDone,
    setDisabledNavButtonsWhenTrainingStarts,
    setDisabledMainButtonsExceptTraining,
    setTimerMode,
  } = useCombineStates();

  /////Initial state/////
  const [workoutButton, setWorkoutButton] = useState(true);

  /////Buttons are disabled if track and exercise not chosen/////
  const disabledFromTraining = !Boolean(userTraining.length);

  /////Skip button is disabled/////
  const [isActiveSkipButton, setIsActiveSkipButton] = useState(false);
  function setActiveSkippedButton() {
    const currentCategory = userTraining[swiperTrackIndex]?.category;
    const filteredUserTraining = userTraining.filter((e) => e.category === currentCategory);
    const filteredDoneExercises = passedExercises.filter((e) => e.category === currentCategory);
    if (filteredUserTraining?.length === 1 && filteredDoneExercises?.length === 0) {
      setIsActiveSkipButton(true);
    } else setIsActiveSkipButton(false);
  }

  useEffect(() => {
    setActiveSkippedButton();
  }, [swiperTrackIndex, userTraining?.length, passedExercises?.length]);

  ////////////////////////////////////////////

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
    setTimerStatusForTraining("start");
    changeStatus();
  };
  return (
    <div>
      <IonGrid className="swiper__grid_container">
        <IonRow className="swiper__grid_row">
          {workoutButton ? (
            <>
              <IonCol>
                <IonButton
                  className="swiper__bar_btn"
                  expand="block"
                  disabled={disabledFromTraining}
                  onClick={() => {
                    setWorkoutButton(false);
                    setDisabledNavButtonsWhenTrainingStarts();
                    setDisabledMainButtonsExceptTraining();
                    setTimerStatusForTraining("start");
                    setTimerMode("preparation");
                  }}
                >
                  <div className="ion-text-uppercase">Start Workout</div>
                </IonButton>
              </IonCol>

              <IonCol>
                <IonButton
                  disabled={disabledFromTraining || isActiveSkipButton}
                  className="swiper__bar_btn"
                  expand="block"
                  onClick={() => {
                    unsetWhenDone();
                    setPassedExercises(swiperTrackIndex, "skipped");
                  }}
                >
                  {/* <IonIcon className="swiper__bar_icon" slot="end" icon={playForwardCircleOutline}></IonIcon> */}
                  {/* <IonIcon className="swiper__bar_icon" slot="end" icon={playForward}></IonIcon> */}
                  <IonIcon className="swiper__bar_icon" slot="end" icon={reloadCircleOutline}></IonIcon>

                  <div className="ion-text-uppercase">Skip</div>
                </IonButton>
              </IonCol>
            </>
          ) : (
            <>
              <IonCol>
                <IonButton
                  className="swiper__bar_btn"
                  disabled={disabledMainButtonsExceptTraining}
                  expand="block"
                  onClick={timerStatusForTraining === "start" ? pauseButtonHandler : playButtonHandler}
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
                  className="swiper__bar_btn  swiper__bar_btn_done"
                  disabled={disabledMainButtonsExceptTraining}
                  expand="block"
                  onClick={() => {
                    swiper.slideNext();
                    setPassedExercises(swiperTrackIndex, "done");
                    setPlayMode("play");
                    setPlayStatus(false);
                    setTimerStatusForTraining("start");
                    setDisabledMainButtonsExceptTraining();
                    setTimerMode("rest");
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
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default SwiperUserButtons;
