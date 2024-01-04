
import React, { useState } from 'react';
import policeImage from "../Images/police2.png";


const ImageSlider = () => {

    return (
        <div className="image-slider">
            <div className="slider-image-container">
                <img
                    src={policeImage}
                    alt={`Slide`}
                    className="slider-image"
                />
                <div className="image-text">Register Your Complaint with Web3.0</div>
            </div>
        </div>
    );
};

export default ImageSlider;