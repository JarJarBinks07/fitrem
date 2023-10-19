import React from "react";

interface IProps {
  id: number;
  category: string;
  exercise: string;
}

const SwiperTitle: React.FC<IProps> = ({ id, category, exercise }) => {
  return (
    <div key={id}>
      <p className="swiper__track_exercise">{category}</p>
      <div className="ion-text-uppercase">
        <p className="swiper__track_category">Track: {exercise}</p>
      </div>
    </div>
  );
};
export default SwiperTitle;
