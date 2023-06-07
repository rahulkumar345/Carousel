import Slider from "react-slick";
import CardDis from "./card";
import React, { useState, useEffect } from "react";
import LeftArrow from "../assets/left-arrow.svg";
import RightArrow from "../assets/right-arrow.svg";
import "./carouselComponent.css";

import axios from "axios";

const CarouselComponent = () => {
  const [cardData, setcardData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const config = {
          headers: {
            Authorization: "letMeIn",
          },
        };
        const res = await axios.get(
          "https://books-api-iofo.onrender.com/books/",
          config
        );
        console.log(res);
        setcardData(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="CarouselItem">
        <Slider {...settings}>
          {cardData.map((x) => {
            return <CardDis x={x} key={x.id} />;
          })}
        </Slider>
      </div>
    </>
  );
};
export default CarouselComponent;
