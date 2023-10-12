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
  exercises: IExercise[];
  setTracks: (value: ITrack[]) => void;
  setExercises: (value: IExercise[]) => void;
};

export const createTracksState: MyStateCreator<StateTrackWithExercise> = (set: any) => ({
  tracks: [],
  setTracks: (value) => set({ tracks: value }, false, "setTracks"),

  exercises: [],
  setExercises: (value) => set(() => ({ exercises: value }), false, "setExercises"),
});
