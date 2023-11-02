import MyStateCreator from "./useCombineStates";

export interface IUser {
  firstConnection: boolean;
  userName: string;
  isEquipment: boolean;
  setFirstConnection: (value: boolean) => void;
  setUserName: (value: string) => void;
  setIsEquipment: () => void;
}

export const createUserState: MyStateCreator<IUser> = (set) => ({
  firstConnection: true,
  setFirstConnection: (value) => set(() => ({ firstConnection: value }), false, "setFirstConnection"),

  userName: "USER",
  setUserName: (value) => set(() => ({ userName: value }), false, "setUserName"),

  isEquipment: false,
  setIsEquipment: () => set((state) => ({ isEquipment: !state.isEquipment }), false, "setIsEquipment"),
});
