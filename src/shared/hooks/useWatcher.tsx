import { useCombineStates } from "../../store/useCombineStates";

export function useWatcher() {
  const { timerMode, playStatus, setTimerStatusForTraining, setPlayStatus } = useCombineStates();

  const setOnBlur = (setModal?: (value: boolean) => void) => {
    setModal && setModal(true);
    setTimerStatusForTraining("pause");
    playStatus ? setPlayStatus(false) : null;
  };

  const setOnFocus = (setOpen?: (value: boolean) => void) => {
    if (timerMode !== "training") {
      setTimerStatusForTraining("start");
    }
    setOpen && setOpen(false);
  };

  return { setOnBlur, setOnFocus };
}
