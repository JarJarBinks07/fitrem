import { MyStateCreator } from "./useCombineStates";

// export typetracksData = [

export type Exercise = {
  id: number;
  video_path: string;
  image_path: string;
  category: string;
  exercise: string;
  tools: boolean;
  description: string;
};

export type StateExercise = {
  exercises: Exercise[];
  setExercises: (value: Exercise[]) => void;
};

export const createTracksState: MyStateCreator<StateExercise> = (set: any) => ({
  exercises: [],
  setExercises: (value) => set(() => ({ exercises: value }), false, "setExercises"),
});
