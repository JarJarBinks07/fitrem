import MyStateCreator from "./useCombineStates";
import { DateTime } from "luxon";

export interface Introduction {
  infoBtn: boolean;
  profileBtn: boolean;
}

export interface IGuide {
  registrationDate: number;
  firstConnection: boolean;
  introButtonsStatus: Introduction;
  delayForShowingGuide: number;
  differenceInTimeForGuide: number;
  setInfoButtonStatus: (value: boolean) => void;
  setProfileButtonStatus: (value: boolean) => void;
  //
  setFirstConnection: (value: boolean) => void;
  checkedDateAfterRegistration: () => void;
  //
  counterBeacons: number;
  setCounterBeacons: () => void;
  showGuideForSkipTimerSettings: boolean;
  setGuideForSkipTimerSettings: (value: boolean) => void;
  showGuideForStartButton: boolean;
  setGuideForStartButton: (value: boolean) => void;
  showGuideForTabTracksButton: boolean;
  setGuideForTabTracksButton: (value: boolean) => void;
  showGuideForCheckbox: boolean;
  setGuideForCheckbox: (value: boolean) => void;
  showGuideForSelectionExercises: boolean;
  setGuideForSelectionExercises: (value: boolean) => void;
  showGuideForTabTrainingButton: boolean;
  setGuideForTabTrainingButton: (value: boolean) => void;
  showGuideForNotification: boolean;
  setGuideForNotification: (value: boolean) => void;
}

export const createGuideState: MyStateCreator<IGuide> = (set) => ({
  firstConnection: true,
  setFirstConnection: (value) => set(() => ({ firstConnection: value }), false, "setFirstConnection"),

  counterBeacons: 0,
  setCounterBeacons: () => set((state) => ({ counterBeacons: ++state.counterBeacons }), false, "setCounterBeacons"),

  introButtonsStatus: {
    infoBtn: true,
    profileBtn: true,
  },
  registrationDate: Date.now(),
  delayForShowingGuide: 30, //must be in sec
  differenceInTimeForGuide: 0,
  checkedDateAfterRegistration: () =>
    set(
      (state) => {
        const currentDate = DateTime.fromMillis(Date.now());
        const registraTionDate = DateTime.fromMillis(state.registrationDate);
        const diffInSeconds = currentDate.diff(registraTionDate, "second");
        const result = diffInSeconds.toObject();
        console.log("DIFFERENCE", result.seconds);
        return { differenceInTimeForGuide: result.seconds };
      },
      false,
      "checkedDateAfterRegistration"
    ),
  setInfoButtonStatus: (value) =>
    set((state) => ({ introButtonsStatus: { ...state.introButtonsStatus, infoBtn: value } }), false, "setInfoButtonStatus"),
  setProfileButtonStatus: (value) =>
    set(
      (state) => ({ introButtonsStatus: { ...state.introButtonsStatus, profileBtn: value } }),
      false,
      "setProfileButtonStatus"
    ),

  showGuideForSkipTimerSettings: false,
  setGuideForSkipTimerSettings: (value) =>
    set(() => ({ showGuideForSkipTimerSettings: value }), false, "setGuideForSkipTimerSettings"),

  showGuideForStartButton: false,
  setGuideForStartButton: (value) => set(() => ({ showGuideForStartButton: value }), false, "setGuideForStartButton"),

  showGuideForTabTracksButton: false,
  setGuideForTabTracksButton: (value) =>
    set(() => ({ showGuideForTabTracksButton: value }), false, "setGuideForTracksButton"),

  showGuideForCheckbox: false,
  setGuideForCheckbox: (value) => set(() => ({ showGuideForCheckbox: value }), false, "setProfileBtnTour"),

  showGuideForSelectionExercises: false,
  setGuideForSelectionExercises: (value) =>
    set(() => ({ showGuideForSelectionExercises: value }), false, "setGuideForSelectionExercises"),

  showGuideForTabTrainingButton: false,
  setGuideForTabTrainingButton: (value) =>
    set(() => ({ showGuideForTabTrainingButton: value }), false, "setGuideForTracksButton"),

  showGuideForNotification: false,
  setGuideForNotification: (value) => set(() => ({ showGuideForNotification: value }), false, "setGuideForNotification"),
});
