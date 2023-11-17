import React, { useState } from "react";
import { IonList, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import { caretDownSharp } from "ionicons/icons";
import { ChartType } from "../../../../store/ChartState";

import "./SelectorForChart.css";

interface IProps {
  setChartInterval: (value: ChartType) => void;
}

const SelectorForChart: React.FC<IProps> = ({ setChartInterval }) => {
  const nameOfPeriod = ["week", "2 weeks", "month", "3 months", "6 months", "12 months"];
  return (
    <div className="chart__container">
      <IonList>
        <IonItem lines="none">
          <IonSelect
            className="never-flip"
            toggleIcon={caretDownSharp}
            interface="popover"
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
