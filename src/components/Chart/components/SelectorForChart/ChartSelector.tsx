import React, { useEffect, useRef } from "react";
import { IonButton, IonButtons, IonContent, IonIcon, IonItem, IonList, IonPopover } from "@ionic/react";
import { caretDown } from "ionicons/icons";

import "./SelectorForChart.css";
import { ChartType } from "../../../../store/ChartState";
interface IProps {
  setChartInterval: (value: ChartType) => void;
}

const ChartSelector: React.FC<IProps> = ({ setChartInterval }) => {
  const popRef = useRef<HTMLIonPopoverElement>(null);
  const intervalName = ["week", "2 weeks", "month", "3 months", "6 months", "12 months"];

  return (
    <>
      <IonButtons className="selector__buttons">
        <IonButton id="popover-button" className="selector__button">
          <IonIcon className="selector__icon" slot="icon-only" icon={caretDown}></IonIcon>
        </IonButton>
      </IonButtons>
      <IonPopover ref={popRef} trigger="popover-button" side="bottom" alignment="start" dismissOnSelect={true}>
        <IonContent>
          <IonList>
            {intervalName.map((item) => (
              <div key={item}>
                <IonItem button={true} detail={false} onClick={() => setChartInterval(item as ChartType)}>
                  {item}
                </IonItem>
              </div>
            ))}
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  );
};
export default ChartSelector;
