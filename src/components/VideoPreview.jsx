import React from "react";
import Carousel from "react-bootstrap/Carousel";

//import Spinner from "react-bootstrap/Spinner";
//import Preload from "image-preload";
//import dummyThumbnail from "../../img/transparentThumb.png";
//import Card from "react-bootstrap/Card";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";

export const VideoPreview = props => {
  const thumbs = props.thumbs;
  //console.log('test5555e thumbs' , thumbs)

  function showPreview() {
    const carousel = (
      <Carousel
        interval={500}
        slide={false}
        controls={false}
        indicators={false}
        pause={false}
      >
        {videoPreviewBuilder()}
      </Carousel>
    );
    return carousel;
  }

  function videoPreviewBuilder() {
    const carouselItems = thumbs.map(item => {
      return (
        <Carousel.Item key={thumbs.indexOf(item)}>
          {/* <img className="d-block w-100" src={item.src} /> */}
          {/* <img className="card-video-preview-img" src={item.src} /> */}
          <img src={item.src} />
          
        </Carousel.Item>
      );
    });
    return carouselItems;
  }

  return showPreview();
};
