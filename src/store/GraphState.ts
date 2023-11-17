import MyStateCreator from "./useCombineStates";

export interface IGraph {
  chartInterval: "week" | "2 weeks" | "month" | "3 months" | "6 months" | "12 months" | string;
  setChartInterval: (value: string) => void;
}

export const createGraphState: MyStateCreator<IGraph> = (set) => ({
  chartInterval: new Date().toDateString(),
  setChartInterval: (value) => set(() => ({ chartInterval: value }), false, "setChartInterval"),
});
