import MyStateCreator from "./useCombineStates";
import { DateTime } from "luxon";

export interface Introduction {
  infoBtn: boolean;
  profileBtn: boolean;
  settingsBtn: boolean;
}

export interface IUser {
  registrationDate: number;

  firstConnection: boolean;
  introButtonsStatus: Introduction;
  mainButtonsTour: boolean;
  profileBtnTour: boolean;
  userName: string;
  isEquipment: boolean;
  setFirstConnection: (value: boolean) => void;
  setMainButtonsTour: (value: boolean) => void;
  setProfileBtnTour: (value: boolean) => void;
  setUserName: (value: string) => void;
  setIsEquipment: () => void;
  checkedDateAfterRegistration: () => void;
}

export const createUserState: MyStateCreator<IUser> = (set) => ({
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

  profileBtnTour: false,
  setProfileBtnTour: (value) => set(() => ({ profileBtnTour: value }), false, "setProfileBtnTour"),

  mainButtonsTour: true,
  setMainButtonsTour: (value) => set(() => ({ mainButtonsTour: value }), false, "checkedInfoButton"),

  userName: "USER",
  setUserName: (value) => set(() => ({ userName: value }), false, "setUserName"),

  isEquipment: false,
  setIsEquipment: () => set((state) => ({ isEquipment: !state.isEquipment }), false, "setIsEquipment"),
});
