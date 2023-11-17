import React from "react";
import { IonButton, IonButtons, IonContent, IonIcon, IonItem, IonList, IonPopover } from "@ionic/react";
import { caretDown } from "ionicons/icons";

import "./SelectorForChart.css";
interface IProps {
  chartInterval: string | "week" | "2 weeks" | "month" | "3 months" | "6 months" | "12 months";
  setChartInterval: (value: string) => void;
}

const SelectorTest: React.FC<IProps> = ({ chartInterval, setChartInterval }) => {
  const intervalName = ["week", "2 weeks", "month", "3 months", "6 months", "12 months"];
  return (
    <>
      <IonButtons className="selector__buttons">
        <IonButton id="popover-button" className="selector__button">
          <IonIcon className="selector__icon" slot="icon-only" icon={caretDown}></IonIcon>
        </IonButton>
      </IonButtons>
      <IonPopover trigger="popover-button" side="bottom" alignment="start" dismissOnSelect={true}>
        <IonContent>
          <IonList>
            {intervalName.map((item) => (
              <div key={item}>
                <IonItem button={true} detail={false} onClick={() => setChartInterval(item)}>
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
export default SelectorTest;
