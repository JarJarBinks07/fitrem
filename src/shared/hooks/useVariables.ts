import { useCombineStates } from "../../store/useCombineStates";
import ISwiper from "swiper";
import _ from "lodash";

export function useVariables() {
  const {
    swiperTrackIndex,
    userTraining,
    timerTrainingInterval,
    timerRestInterval,
    setTimerTrainingStatus,
    setPlayStatus,
    setStartWorkout,
    setTimerNotificationInterval,
    setTimerTrainingInterval,
    setTimerRestInterval,
    setExercisesAfterTraining,
    setIsNotification,
    setDisabledNavigationButtons,
    setTimeTrainingDuration,
    setTimerMode,
    setIsOpenSwiperAlert,
    setDoneExercise,
    unsetWhenDone,
    unsetTrainingTimer,
    unsetNotificationTimer,
  } = useCombineStates();

  // use in TimersForTraining and SwiperUserButtons
  const setSettings = (interval: number, mode: "preparation" | "training" | "rest", status: boolean) => {
    setTimeTrainingDuration(interval * 1000);
    setTimerMode(mode);
    setPlayStatus(status);
  };

  // use for applying changes in Modal Settings
  const onSaveSettingsHandler = (notificationValue: number, trainingValue: number, restValue: number) => {
    setTimerNotificationInterval(notificationValue);
    setTimerTrainingInterval(trainingValue);
    setTimerRestInterval(restValue);
    //   setOnFocus(setIsOpenModalSettings);
    unsetWhenDone();
    unsetNotificationTimer();
  };

  // use when training was passed
  const onCompleteAfterTraining = (swiper: ISwiper) => {
    swiper?.slideTo(0, 1000);
    setIsNotification(true);
    setStartWorkout(true);
    setDisabledNavigationButtons(true);
    setExercisesAfterTraining();
    //   setIsModalStatistic(false);  transfered as props
  };

  //use after done exercise for reductive logic in TimersForTraining and SwiperUserButtons
  const activeCategoryLength = Object.keys(_.groupBy(userTraining, "category")).length;

  const executorDoneExercise = () => {
    if (swiperTrackIndex === activeCategoryLength - 1) {
      setTimerTrainingStatus("pause");
      setSettings(timerTrainingInterval, "training", false);
      setIsOpenSwiperAlert(true);
      unsetWhenDone();
      setDoneExercise(swiperTrackIndex);

      return;
    }
    setDoneExercise(swiperTrackIndex);
    setSettings(timerRestInterval, "rest", false);
    unsetTrainingTimer();
    setTimerTrainingStatus("start");
  };

  return { activeCategoryLength, setSettings, onSaveSettingsHandler, onCompleteAfterTraining, executorDoneExercise };
}
