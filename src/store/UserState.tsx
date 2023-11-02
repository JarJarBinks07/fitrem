import MyStateCreator from "./useCombineStates";

export interface IUser {
  userName: string;
  setUserName: (value: string) => void;
}

export const createUserState: MyStateCreator<IUser> = (set) => ({
  userName: "",
  setUserName: (value) => set(() => ({ userName: value }), false, "setUserName"),
});
