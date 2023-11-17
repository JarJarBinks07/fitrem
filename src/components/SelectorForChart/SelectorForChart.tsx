import React, { useState } from "react";
import { IonList, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import { caretDownSharp } from "ionicons/icons";

import "./SelectorForChart.css";

interface IProps {
  chartInterval: "" | "week" | "2 weeks" | "month" | "3 months" | "6 months" | "12 months";
  setChartInterval: (value: "week" | "2 weeks" | "month" | "3 months" | "6 months" | "12 months") => void;
}

const SelectorForChart: React.FC<IProps> = ({ chartInterval, setChartInterval }) => {
  const nameOfPeriod = ["week", "2 weeks", "month", "3 months", "6 months", "12 months"];
  const [test, setTest] = useState(chartInterval);
  return (
    <div className="chart__container">
      <IonList>
        <IonItem lines="none">
          <IonSelect
            className="never-flip"
            toggleIcon={caretDownSharp}
            interface="popover"
            // placeholder="Select period"
            labelPlacement="end"
            onIonChange={(e) => setChartInterval(e.detail.value)}
          >
            {nameOfPeriod.map((item, index) => (
              <div key={nameOfPeriod[index]}>
                <IonSelectOption value={item}>{item}</IonSelectOption>
              </div>
            ))}
          </IonSelect>
        </IonItem>
      </IonList>
    </div>
  );
};

export default SelectorForChart;
