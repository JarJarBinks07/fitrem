import { MyStateCreator } from "./useCombineStates";

export type Exercise = {
  id: number;
  name: string;
  image: string;
  imageUrl: string;
  video: string;
  videoUrl: string;
  description: string;
  subtitle: string;
};

export type StateExercise = {
  exercises: Exercise[];
  setExercises: (value: Exercise[]) => void;
};

export const createTracksState: MyStateCreator<StateExercise> = (set: any) => ({
  exercises: [],
  setExercises: (value) => set(() => ({ exercises: value }), false, "setExercises"),
});
