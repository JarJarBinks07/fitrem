import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import { A11y, Navigation } from "swiper/modules";
import { useSwiper } from "swiper/react";

const Grid = ({ blok }) => {
  const swiperGridRef = useRef(null);

  useEffect(() => {
    register();
    const params = {
      navigation: false,
      slidesPerView: 1,
      modules: [Navigation, A11y],
    };
    Object.assign(swiperGridRef.current, params);
    swiperGridRef.current.initialize();
  }, []);

  const SwiperButtonPrev = () => {
    const swiper = useSwiper();
    return <ArrowLeft onClick={() => swiper.slidePrev()} src="/images/arrowRight.svg" width="40px" height="40px" />;
  };

  const SwiperButtonNext = () => {
    const swiper = useSwiper();
    return <ArrowRight onClick={() => swiper.slideNext()} src="/images/arrowRight.svg" width="40px" height="40px" />;
  };
  return (
    <>
      <Wrapper columns={blok.numberOfColumns || "4"} height={blok.rowHeight}>
        {blok.content?.map((blok) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))}
      </Wrapper>
      <SlideWrapper>
        <swiper-container init="false" className="mySwiper">
          <SwiperButtonPrev />
          <SwiperButtonNext />
          {blok.content?.map((blok) => (
            <swiper-slide key={blok._uid}>
              <StoryblokComponent blok={blok} />
            </swiper-slide>
          ))}
        </swiper-container>
      </SlideWrapper>
    </>
  );
};
