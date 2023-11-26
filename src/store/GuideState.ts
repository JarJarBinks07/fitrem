import MyStateCreator from "./useCombineStates";
import { DateTime } from "luxon";

export interface Introduction {
  infoBtn: boolean;
  profileBtn: boolean;
}

export interface IGuide {
  firstConnection: boolean;
  stepsForBeacons: number;
  introButtonsStatus: Introduction;
  registrationDate: number;
  delayForShowingGuide: number;
  differenceInTimeForGuide: number;
  setFirstConnection: (value: boolean) => void;
  setStepsForBeacons: () => void;
  checkedDateAfterRegistration: () => void;
  setInfoButtonStatus: (value: boolean) => void;
  setProfileButtonStatus: (value: boolean) => void;
}

export const createGuideState: MyStateCreator<IGuide> = (set) => ({
  firstConnection: true,
  setFirstConnection: (value) => set(() => ({ firstConnection: value }), false, "setFirstConnection"),

  stepsForBeacons: 0,
  setStepsForBeacons: () => set((state) => ({ stepsForBeacons: ++state.stepsForBeacons }), false, "setCounterBeacons"),

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
});
