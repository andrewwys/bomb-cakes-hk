import React, { Component } from "react";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      arrows: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      className: 'simple-slider'
    };
    return (
      <Slider {...settings}>
        <div>
         <img src={"https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract01.jpg"} />
        </div>
        <div>
         <img src={"https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract02.jpg"} />
        </div>
        <div>
         <img src={"https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract03.jpg"} />
        </div>
        <div>
         <img src={"https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract04.jpg"} />
        </div>
      </Slider>
    );
  }
}

export default SimpleSlider;