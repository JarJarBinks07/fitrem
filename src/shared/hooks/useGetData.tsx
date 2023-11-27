import { useEffect } from "react";
import { saveTrackResources } from "../../settings/capacitor.storage";
import { ITrack, IExercise } from "../../store/TracksState";
import { useCombineStates } from "../../store/useCombineStates";
import { tracksData, exercisesData } from "../tracks/tracks";

export function useGetData() {
  const { setAllExercises, setAllTracks } = useCombineStates();

  const fetchData = async () => {
    const responseWithTracks: ITrack[] = tracksData;
    const responseWithExercises: IExercise[] = exercisesData;
    await Promise.all(
      responseWithExercises.map(async (e) => {
        const imageName = e.image_path.split("/").pop() as string;
        const videoName = e.video_path.split("/").pop() as string;
        await Promise.all([saveTrackResources(e.image_path, imageName), saveTrackResources(e.video_path, videoName)]);
      })
    );
    setAllTracks(responseWithTracks);
    setAllExercises(responseWithExercises);
  };

  return { fetchData };
}
