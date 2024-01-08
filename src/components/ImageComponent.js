import React, { useState, useEffect } from 'react';
import './ImageComponent.css';

const ImageComponent = ({ imageUrl, altText, onImageClick, onAnimationComplete }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleImageClick = async () => {
        setIsSelected(true);

        // Trigger animation and fetch new images after a delay
        await onAnimationComplete();

        // Call the onImageClick callback
        onImageClick();

        setIsSelected(false);
    };

    // Ensure that the component re-renders when the imageUrl changes
    useEffect(() => {
        setIsSelected(false);
    }, [imageUrl]);

    return (
        <div className={`card m-3 ${isSelected ? 'selected' : ''}`} onClick={handleImageClick} style={{ cursor: 'pointer' }}>
        <img src={imageUrl} alt={altText} className="card-img-top" width="500" height="500" />
        </div>
    );
};

export default ImageComponent;