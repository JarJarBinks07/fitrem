import { MyStateCreator } from "./useCombineStates";

export interface ITracks {
  bicepCheckBox: boolean;
  jumpCheckBox: boolean;
  stepCheckBox: boolean;
  selectedCategories: string[];
  setSelectedCategories: (value: string) => void;

  setBicepCheckBox: () => void;
  setJumpCheckBox: () => void;
  setStepCheckBox: () => void;
}

export const createTrackState: MyStateCreator<ITracks> = (set: any) => ({
  selectedCategories: [],
  setSelectedCategories: (value: string) =>
    set(
      (state: ITracks) => {
        let newCategories = [...state.selectedCategories];
        if (state.selectedCategories.includes(value)) {
          newCategories = state.selectedCategories.filter((e) => e != value);
        } else {
          newCategories.push(value);
        }
        return { selectedCategories: newCategories };
      },
      false,
      "setSelectedCategories"
    ),

  bicepCheckBox: false,
  setBicepCheckBox: () => set((state: ITracks) => ({ bicepCheckBox: !state.bicepCheckBox }), false, "setBicepCheckBox"),

  jumpCheckBox: false,
  setJumpCheckBox: () => set((state: ITracks) => ({ jumpCheckBox: !state.jumpCheckBox }), false, "setJumpCheckBox"),

  stepCheckBox: false,
  setStepCheckBox: () => set((state: ITracks) => ({ stepCheckBox: !state.stepCheckBox }), false, "setStepCheckBox"),
});
