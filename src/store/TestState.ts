import { MyStateCreator } from "./useCombineStates";

export interface ITest {
  // number: number;
  // isActive: boolean;
  // increaseNumber: () => void;
  // decreaseNumber: () => void;
}

export const createTestState: MyStateCreator<ITest> = (set: any) => ({
  // number: 0,
  // isActive: false,
  // increaseNumber: () => set((state: ITest) => ({ number: ++state.number })),
  // decreaseNumber: () => set((state: ITest) => ({ number: --state.number })),
});
