import MyStateCreator from "./useCombineStates";

export interface IUser {
  userName: string;
  isEquipment: boolean;
  setUserName: (value: string) => void;
  setIsEquipment: () => void;
}

export const createUserState: MyStateCreator<IUser> = (set) => ({
  userName: "USER",
  setUserName: (value) => set(() => ({ userName: value }), false, "setUserName"),

  isEquipment: false,
  setIsEquipment: () => set((state) => ({ isEquipment: !state.isEquipment }), false, "setIsEquipment"),
});
