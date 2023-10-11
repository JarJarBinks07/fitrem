/* Exercise type matching model of Exercise entitities */

export type Exercise = {
  id: number;
  track_id: number;
  title: string;
  description: string;
  image: string;
  video: string;
  // active: boolean
  // done: boolean
  // url?: string;
  // owner_id?: string;
  // pub_catalog_id?: string | null;
  // in certain cases irrelevant
  // editExercise?: number | null
};

export type Track = {
  id: number;
  title: string;
  // exercises: Exercise[];
  // exerciseTotal: number;
  // exercisesOnHold: number[];
  // selectedExercise: {
  //   id: number;
  //   done: true | false;
  // };
};
