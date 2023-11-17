import MyStateCreator from "./useCombineStates";

export interface IGraph {
  chartInterval: "" | "week" | "2 weeks" | "month" | "3 months" | "6 months" | "12 months";
  setChartInterval: (value: "week" | "2 weeks" | "month" | "3 months" | "6 months" | "12 months") => void;
}

export const createGraphState: MyStateCreator<IGraph> = (set) => ({
  chartInterval: "",
  setChartInterval: (value) => set(() => ({ chartInterval: value }), false, "setChartInterval"),
});
