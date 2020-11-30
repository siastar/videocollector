import React from "react";
import Carousel from "react-bootstrap/Carousel";

export const AdsCarousel = props => {
  //console.log("test5555ww index carousel", props.carouselData);

  const carouselData = props.carouselData;
  //console.log("test5555ww array carousel", props.carouselData);
  //console.log("test5555ww array carousel2", carouselData);

  function showAdsCarousel() {
    const carousel = (
      <div className="adbox">
        <Carousel
          interval={1500}
          //slide={true}
          fade={true}
          controls={false}
          indicators={false}
          pause={false}
        >
          {carouselItemsBuilder()}
        </Carousel>
      </div>
    );
    return carousel;
  }

  function carouselItemsBuilder() {
    const carouselItems = carouselData.map(item => {
      return (
        <Carousel.Item key={carouselData.indexOf(item)}>
          <img className=""  src={item.src} alt={item.alt} />
        </Carousel.Item>
      );
    });
    return carouselItems;
  }
  //return <div/>

  return showAdsCarousel();
};
