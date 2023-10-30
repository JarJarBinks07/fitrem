import React, { useEffect, useState } from "react";
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { checkmarkCircleOutline, pauseCircleOutline, playCircleOutline, reloadCircleOutline } from "ionicons/icons";
import { useCombineStates } from "../../../../store/useCombineStates";
import ISwiper from "swiper";
import _ from "lodash";

interface IProps {
  swiper: ISwiper;
  setIsOpenSwiperAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setSettings: (interval: number, mode: "preparation" | "training" | "rest", status: boolean) => void;
}

const SwiperUserButtons: React.FC<IProps> = ({ swiper, setIsOpenSwiperAlert, setSettings }) => {
  const {
    preparationTime,
    timerRestInterval,
    timerTrainingInterval,
    swiperTrackIndex,
    playStatus,
    startWorkout,
    timerTrainingStatus,
    timeTrainingAfterPause,
    userTraining,
    passedExercises,
    disabledPlayDoneButtons,
    setTimerTrainingStatus,
    setTimeTrainingAfterPause,
    setTimeTrainingDuration,
    unsetWhenDone,
    setDisabledNavigationButtons,
    setDisabledPlayDoneButtons,
    setTimerMode,
    setStartWorkout,
    setPlayStatus,
    setSkippedExercise,
    setDoneExercise,
  } = useCombineStates();

  const counterActiveTracks = Object.keys(_.groupBy(userTraining, "category")).length;

  // useEffect uses to exclude problem with play/pause mode for persist

  const [status, setStatus] = useState(false);
  useEffect(() => {
    setStatus(playStatus);
  });

  // Buttons are disabled if track and exercise not chosen
  const disabledFromTraining = !Boolean(userTraining.length);

  // Skip button is disabled
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

  const playButtonHandler = () => {
    if (timeTrainingAfterPause) {
      setTimeTrainingDuration(timeTrainingAfterPause);
    } else {
      // value must be in milliseconds
      setTimeTrainingDuration(timerTrainingInterval * 1000);
    }
    setTimerTrainingStatus("start");
    setPlayStatus(true);
  };

  const pauseButtonHandler = () => {
    setTimerTrainingStatus("pause");
    setTimeTrainingAfterPause();
    setPlayStatus(false);
  };

  return (
    <div>
      <IonGrid className="swiper__grid_container">
        <IonRow className="swiper__grid_row">
          {!startWorkout ? (
            <>
              <IonCol>
                <IonButton
                  className="swiper__bar_btn"
                  expand="block"
                  disabled={disabledFromTraining}
                  onClick={() => {
                    if (counterActiveTracks > 1) {
                      swiper.slideTo(0, 1000);
                    }
                    setStartWorkout(true);
                    setDisabledNavigationButtons(false);
                    setDisabledPlayDoneButtons();
                    setTimerTrainingStatus("start");
                    setSettings(preparationTime, "preparation", false);
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
                    setSkippedExercise(swiperTrackIndex);
                  }}
                >
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
                  disabled={disabledPlayDoneButtons}
                  expand="block"
                  onClick={timerTrainingStatus === "start" ? pauseButtonHandler : playButtonHandler}
                >
                  <IonIcon
                    className="swiper__bar_icon"
                    slot="end"
                    icon={status ? pauseCircleOutline : playCircleOutline}
                  ></IonIcon>
                  <div className="ion-text-uppercase">{playStatus ? "pause" : "play"}</div>
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  className="swiper__bar_btn  swiper__bar_btn_done"
                  disabled={disabledPlayDoneButtons}
                  expand="block"
                  onClick={() => {
                    if (counterActiveTracks > 1) {
                      swiper.slideNext();
                    }
                    if (swiperTrackIndex === counterActiveTracks - 1) {
                      setSettings(timerTrainingInterval, "training", false);
                      setIsOpenSwiperAlert(true);
                      setDoneExercise(swiperTrackIndex);
                      unsetWhenDone();
                      setTimerTrainingStatus("pause");
                      return;
                    }

                    setSettings(timerRestInterval, "rest", false);
                    setDisabledPlayDoneButtons();
                    setTimerTrainingStatus("start");
                    setDoneExercise(swiperTrackIndex);
                    unsetWhenDone();
                  }}
                >
                  <IonIcon className="swiper__bar_icon" slot="end" icon={checkmarkCircleOutline}></IonIcon>

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
