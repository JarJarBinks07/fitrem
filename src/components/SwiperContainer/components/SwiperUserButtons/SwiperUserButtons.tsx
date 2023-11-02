import React, { useEffect, useState } from "react";
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { checkmarkCircleOutline, pauseCircleOutline, playCircleOutline, reloadCircleOutline } from "ionicons/icons";
import { useCombineStates } from "../../../../store/useCombineStates";
import ISwiper from "swiper";
import _ from "lodash";
import TestTour from "../../../JoyRide/TestTour";

interface IProps {
  swiper: ISwiper;
  counterActiveTracks: number;
  executorDoneExercise: () => void;
  setSettings: (interval: number, mode: "preparation" | "training" | "rest", status: boolean) => void;
}

const SwiperUserButtons: React.FC<IProps> = ({ swiper, counterActiveTracks, setSettings, executorDoneExercise }) => {
  const {
    preparationTime,
    timerTrainingInterval,
    swiperTrackIndex,
    playStatus,
    startWorkout,
    timerTrainingStatus,
    timeTrainingAfterPause,
    userTraining,
    disabledPlayDoneButtons,
    setTimerTrainingStatus,
    setTimeTrainingAfterPause,
    setTimeTrainingDuration,
    unsetWhenDone,
    setDisabledNavigationButtons,
    setDisabledPlayDoneButtons,
    setStartWorkout,
    setPlayStatus,
    setSkippedExercise,
  } = useCombineStates();

  // useEffect uses to exclude problem with play/pause mode for persist
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(playStatus);
  });

  // buttons are disabled if track and exercise not chosen
  const disabledFromTraining = !Boolean(userTraining.length);

  // SKIP button is disabled
  const [disabledSkipButton, setDisabledSkipButton] = useState(false);
  const handlerDisabledSkipButton = () => {
    const currentCategory = userTraining[swiperTrackIndex]?.category;
    const groupedByTrainingCategory = _.groupBy(userTraining, "category");
    groupedByTrainingCategory[currentCategory]?.length === 1 ? setDisabledSkipButton(true) : setDisabledSkipButton(false);
  };

  useEffect(() => {
    handlerDisabledSkipButton();
  }, [swiperTrackIndex, userTraining?.length]);

  //use when user clicks on PLAY or PAUSE button
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

  // use when user clicks on Start Workout button
  const startWorkoutClick = () => {
    if (counterActiveTracks > 1) {
      swiper.slideTo(0, 1000);
    }
    setStartWorkout(false);
    setDisabledNavigationButtons(false);
    setDisabledPlayDoneButtons(true);
    setTimerTrainingStatus("start");
    setSettings(preparationTime, "preparation", false);
  };

  return (
    <div>
      <IonGrid className="swiper__grid_container">
        <IonRow className="swiper__grid_row">
          {startWorkout ? (
            <>
              <IonCol>
                <IonButton
                  className="swiper__bar_btn testim"
                  expand="block"
                  disabled={disabledFromTraining}
                  onClick={startWorkoutClick}
                >
                  <div className="ion-text-uppercase">Start Workout</div>
                </IonButton>
              </IonCol>

              <IonCol>
                <IonButton
                  disabled={disabledFromTraining || disabledSkipButton}
                  // disabled={disabledSkipButton}
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
                  onClick={executorDoneExercise}
                >
                  <IonIcon className="swiper__bar_icon" slot="end" icon={checkmarkCircleOutline}></IonIcon>

                  <div className="ion-text-uppercase">Done</div>
                </IonButton>
              </IonCol>
            </>
          )}
        </IonRow>
      </IonGrid>
      {/* <TestTour /> */}
    </div>
  );
};

export default SwiperUserButtons;
