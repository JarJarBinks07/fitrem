import React from "react";

interface IProps {
  category: string;
  exercise: string;
}

const SwiperTitle: React.FC<IProps> = ({ category, exercise }) => {
  return (
    <>
      <p className="swiper__track_exercise">{category}</p>
      <div className="ion-text-uppercase">
        <p className="swiper__track_category">Track: {exercise}</p>
      </div>
    </>
  );
};
export default SwiperTitle;
