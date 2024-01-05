import React, { useState } from 'react';
import './ImageComponent.css';

const ImageComponent = ({ imageUrl, altText, onImageClick, onAnimationComplete }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleImageClick = async () => {
        setIsSelected(true);
        
        // Trigger animation and fetch new images after a delay
        await onAnimationComplete();
        
        setIsSelected(false);
    };
    
    return (
        <div className={`card m-3 ${isSelected ? 'selected' : ''}`} onClick={handleImageClick} style={{ cursor: 'pointer' }} >
            <img src={imageUrl} alt={altText} className="card-img-top" width="500" height="500" />
        </div>
    );
};

export default ImageComponent;