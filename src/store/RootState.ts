import { MyStateCreator } from "./useCombineStates";

export interface IRoot {
  rehydrated: boolean;
}

export const createRootState: MyStateCreator<IRoot> = (set: any) => ({
  rehydrated: false,
});
