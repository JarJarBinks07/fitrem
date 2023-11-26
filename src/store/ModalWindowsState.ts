import MyStateCreator from "./useCombineStates";

export interface IModal {
  isOpenSwiperAlert: boolean;
  isOpenModalExercise: boolean;
  isOpenModalSettings: boolean;
  isModalStatistic: boolean;
  isOpenProfileMenu: boolean;
  setIsOpenSwiperAlert: (value: boolean) => void;
  setIsOpenModalExercise: (value: boolean) => void;
  setIsOpenModalSettings: (value: boolean) => void;
  setIsModalStatistic: (value: boolean) => void;
  setIsOpenProfileMenu: (value: boolean) => void;
}

export const createModalWindowsState: MyStateCreator<IModal> = (set) => ({
  isOpenSwiperAlert: false,
  setIsOpenSwiperAlert: (value) => set(() => ({ isOpenSwiperAlert: value }), false, "setIsOpenSwiperAlert"),

  isOpenModalExercise: false,
  setIsOpenModalExercise: (value) => set(() => ({ isOpenModalExercise: value }), false, "setIsOpenModalExercise"),

  isOpenModalSettings: false,
  setIsOpenModalSettings: (value) => set(() => ({ isOpenModalSettings: value }), false, "isOpenModalSettings"),

  isModalStatistic: false,
  setIsModalStatistic: (value) => set(() => ({ isModalStatistic: value }), false, "setIsModalStatistic"),

  isOpenProfileMenu: false,
  setIsOpenProfileMenu: (value) => set(() => ({ isOpenProfileMenu: value }), false, "setIsOpenProfileMenu"),
});
