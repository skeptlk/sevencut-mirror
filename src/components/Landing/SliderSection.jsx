import React from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const images = ['/img/1.png', '/img/2.png', '/img/3.png', '/img/1.png', '/img/2.png', '/img/3.png'];

const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [ {
            breakpoint: 992,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }
    ]
};

export default function SliderSection() {
    return (
        <div className="row slider">
            <div className="col-12">
                <Slider {...settings}>{ 
                    images.map(src => (
                        <div className="inner">
                            <img src={src} alt="Процесс работы" />
                        </div>
                    )) 
                }</Slider>
            </div>
        </div>
    );
}

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <FontAwesomeIcon icon={faAngleRight}
            className={className}
            style={{ ...style }}
            onClick={onClick} />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <FontAwesomeIcon icon={faAngleLeft}
            className={className}
            style={{ ...style }}
            onClick={onClick} />
    );
}
