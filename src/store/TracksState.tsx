import { MyStateCreator } from "./useCombineStates";

export interface ITrack {
  id: number;
  category: string;
  img_path: string;
}

export interface IExercise {
  id: number;
  video_path: string;
  image_path: string;
  category: string;
  exercise: string;
  tools: boolean;
  description: string;
}

export type StateTrackWithExercise = {
  tracks: ITrack[];
  allExercises: IExercise[];
  checkedExercises: IExercise[];
  setTracks: (value: ITrack[]) => void;
  setExercises: (value: IExercise[]) => void;
  setCheckedExercises: (value: number) => void;
};

export const createTracksState: MyStateCreator<StateTrackWithExercise> = (set: any) => ({
  tracks: [],
  setTracks: (value) => set({ tracks: value }, false, "setTracks"),

  allExercises: [],
  setExercises: (value) => set(() => ({ allExercises: value }), false, "setExercises"),

  checkedExercises: [],
  setCheckedExercises: (value: number) =>
    set(
      (state: StateTrackWithExercise) => {
        let newExercises = [...state.checkedExercises];
        if (state.checkedExercises.find((e) => e.id === value)) {
          newExercises = state.checkedExercises.filter((e) => e.id != value);
        } else {
          newExercises.push(...state.allExercises.filter((e) => e.id === value));
        }
        return { checkedExercises: newExercises };
      },
      false,
      "setCheckedExercises"
    ),
});
