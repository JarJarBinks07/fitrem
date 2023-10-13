import { MyStateCreator } from "./useCombineStates";

export interface IActiveTrack {
  selectedTracks: string[];
  setSelectedTracks: (value: string) => void;
}

export const createActiveTrackState: MyStateCreator<IActiveTrack> = (set) => ({
  selectedTracks: ["Biceps"],
  setSelectedTracks: (value: string) =>
    set(
      (state) => {
        let newCategories = [...state.selectedTracks];
        if (state.selectedTracks.includes(value)) {
          if (state.selectedTracks.length > 1) {
            newCategories = state.selectedTracks.filter((e) => e !== value);
          } else {
            return state;
          }
        } else {
          newCategories.push(value);
        }
        return { ...state, selectedTracks: newCategories };
      },
      false,
      "setSelectedCategories"
    ),
});
