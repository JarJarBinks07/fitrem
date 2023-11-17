import MyStateCreator from "./useCombineStates";

export type ChartType = "week" | "2 weeks" | "month" | "3 months" | "6 months" | "12 months";

export interface IChart {
  chartInterval: ChartType;
  setChartInterval: (value: ChartType) => void;
}

export const createChartState: MyStateCreator<IChart> = (set) => ({
  chartInterval: "week",
  setChartInterval: (value) => set(() => ({ chartInterval: value }), false, "setChartInterval"),
});
