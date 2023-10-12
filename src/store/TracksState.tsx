import { MyStateCreator } from "./useCombineStates";
import _ from "lodash";

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
  selectedExercises: IExercise[];
  userTraining: IExercise[];
  setTracks: (value: ITrack[]) => void;
  setExercises: (value: IExercise[]) => void;
  setCheckedExercises: (value: number) => void;
  generateUserTraining: () => void;
};

export const createTracksState: MyStateCreator<StateTrackWithExercise> = (set) => ({
  tracks: [],
  setTracks: (value) => set({ tracks: value }, false, "setTracks"),

  allExercises: [],
  setExercises: (value) => set(() => ({ allExercises: value }), false, "setExercises"),

  selectedExercises: [
    {
      id: 1,
      video_path: "/assets/tracks/bicep/Bicep_01.mp4",
      image_path: "/assets/tracks/bicep/Bicep_01.jpg",
      category: "Biceps",
      exercise: "upper body #1",
      tools: true,
      description:
        "1_Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque, dicta",
    },
  ],
  setCheckedExercises: (value: number) =>
    set(
      (state) => {
        let newExercises = [...state.selectedExercises];
        if (state.selectedExercises.find((e) => e.id === value)) {
          if (state.selectedExercises.length > 1) {
            newExercises = state.selectedExercises.filter((e) => e.id != value);
          } else {
            return state;
          }
        } else {
          newExercises.push(...state.allExercises.filter((e) => e.id === value));
        }
        return { selectedExercises: newExercises };
      },
      false,
      "setCheckedExercises"
    ),

  userTraining: [],
  generateUserTraining: () =>
    set((state) => {
      const activeTracks = state.selectedTracks;
      console.log(activeTracks);

      const filteredExercises = state.selectedExercises.filter((e) => activeTracks.includes(e.category));
      const groupedByCategory = _.groupBy(filteredExercises, "category");
      console.log(groupedByCategory);
      const result = [];
      let maxLength = 0;
      for (const key of activeTracks) {
        if (!groupedByCategory[key]) {
          groupedByCategory[key] = [];
        }
        maxLength = Math.max(groupedByCategory[key].length, maxLength);
      }
      for (let i = 0; i < maxLength; i++) {
        for (const key of activeTracks) {
          const currentArray = groupedByCategory[key];
          if (i < currentArray.length) {
            const currentElement = currentArray[i];
            result.push(currentElement);
          }
        }
      }

      return { userTraining: result };
    }),
});
