import MyStateCreator from "./useCombineStates";
import { DateTime } from "luxon";

export interface Introduction {
  infoBtn: boolean;
  profileBtn: boolean;
  settingsBtn: boolean;
}

export interface IGuide {
  registrationDate: number;
  firstConnection: boolean;
  introButtonsStatus: Introduction;

  tracksTour: boolean;
  setFirstConnection: (value: boolean) => void;
  setTracksTour: (value: boolean) => void;
  checkedDateAfterRegistration: () => void;
  //
  counterBeacons: number;
  setCounterBeacons: () => void;
  showGuideForSkipTimerSettings: boolean;
  setGuideForSkipTimerSettings: (value: boolean) => void;
  showGuideForStartButton: boolean;
  setGuideForStartButton: (value: boolean) => void;
  showGuideForTracksButton: boolean;
  setGuideForTracksButton: (value: boolean) => void;
}

export const createGuideState: MyStateCreator<IGuide> = (set) => ({
  counterBeacons: 0,
  setCounterBeacons: () => set((state) => ({ counterBeacons: ++state.counterBeacons }), false, "setCounterBeacons"),

  registrationDate: 1698951545544,
  checkedDateAfterRegistration: () =>
    set(
      (state) => {
        const currentDate = DateTime.fromMillis(Date.now());
        const registraTionDate = DateTime.fromMillis(state.registrationDate);

        const diffInDays = currentDate.diff(registraTionDate, "second");
        const result = diffInDays.toObject(); //=> { months: 1 }
        console.log("DIFFERENCE", result);
        return state;
      },
      false,
      "checkedDateAfterRegistration"
    ),
  introButtonsStatus: {
    infoBtn: false,
    profileBtn: false,
    settingsBtn: false,
  },
  firstConnection: true,
  setFirstConnection: (value) => set(() => ({ firstConnection: value }), false, "setFirstConnection"),

  tracksTour: true,
  setTracksTour: (value) => set(() => ({ tracksTour: value }), false, "setProfileBtnTour"),

  showGuideForSkipTimerSettings: false,
  setGuideForSkipTimerSettings: (value) =>
    set(() => ({ showGuideForSkipTimerSettings: value }), false, "setGuideForSkipTimerSettings"),

  showGuideForStartButton: false,
  setGuideForStartButton: (value) => set(() => ({ showGuideForStartButton: value }), false, "setGuideForStartButton"),

  showGuideForTracksButton: false,
  setGuideForTracksButton: (value) => set(() => ({ showGuideForTracksButton: value }), false, "setGuideForTracksButton"),
});
