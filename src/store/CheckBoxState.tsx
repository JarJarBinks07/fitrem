import { MyStateCreator } from "./useCombineStates";

export interface ICheckBox {
  count: number;
  selectedCategories: string[];
  setSelectedCategories: (value: string) => void;
}

export const createCheckBoxState: MyStateCreator<ICheckBox> = (set: any) => ({
  count: 1,
  selectedCategories: ["Biceps"],
  setSelectedCategories: (value: string) =>
    set(
      (state: ICheckBox) => {
        let newCategories = [...state.selectedCategories];
        if (state.selectedCategories.includes(value)) {
          newCategories = state.selectedCategories.filter((e) => e != value);
          --state.count;
        } else {
          newCategories.push(value);
          ++state.count;
        }
        return { selectedCategories: newCategories };
      },
      false,
      "setSelectedCategories"
    ),
});
