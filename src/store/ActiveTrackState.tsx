import { MyStateCreator } from "./useCombineStates";

export interface IActiveTrack {
  selectedCategoryTracks: string[];
  setSelectedCategoryTracks: (value: string) => void;
  setReorderedSelectedCategoryTracks: () => void;
}

export const createActiveTrackState: MyStateCreator<IActiveTrack> = (set) => ({
  selectedCategoryTracks: ["Biceps"],

  setSelectedCategoryTracks: (value: string) =>
    set(
      (state) => {
        let newCategories = [...state.selectedCategoryTracks];
        if (state.selectedCategoryTracks.includes(value)) {
          if (state.selectedCategoryTracks.length > 1) {
            newCategories = state.selectedCategoryTracks.filter((e) => e !== value);
          } else {
            return state;
          }
        } else {
          newCategories.push(value);
        }
        return { ...state, selectedCategoryTracks: newCategories };
      },
      false,
      "setSelectedCategories"
    ),
  setReorderedSelectedCategoryTracks: () =>
    set(
      (state) => {
        const reorderedArr = [...state.tracks].map((item) => item.category);
        const filteredActiveTracks = reorderedArr.filter((e) => state.selectedCategoryTracks.includes(e));
        return { selectedCategoryTracks: filteredActiveTracks };
      },
      false,
      "setReorderedSelectedCategoryTracks"
    ),
});
