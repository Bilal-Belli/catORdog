import React, { useState, useEffect } from 'react';
import ImageComponent from './components/ImageComponent';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // dogs API
  const [dogImageUrl, setDogImageUrl] = useState(null);
  // cats API
  const [catImageUrl, setCatImageUrl] = useState(null);
  // counters
  const [catCount, setCatCount] = useState(0);
  const [dogCount, setDogCount] = useState(0);

  useEffect(() => {
    // Fetch initial images
    fetchDogImage();
    fetchCatImage();
  }, []);

  const fetchDogImage = async () => {
    try {
      const response = await fetch('https://api.thedogapi.com/v1/images/search');
      const data = await response.json();
      if (data && data.length > 0) {
        setDogImageUrl(data[0].url);
      }
    } catch (error) {
      console.error('Error fetching dog image:', error);
    }
  };

  const fetchCatImage = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      if (data && data.length > 0) {
        setCatImageUrl(data[0].url);
      }
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  };

  const handleImageClick = (animalType) => {
    if (animalType === 'Cat Image') {
      setCatCount((prevCount) => prevCount + 1);
    } else if (animalType === 'Dog Image') {
      setDogCount((prevCount) => prevCount + 1);
    }
  };

  const handleAnimationComplete = async () => {
    // Fetch new dog and cat images after the animation completes
    await fetchDogImage();
    await fetchCatImage();
  };

  const calculatePercentage = (count, totalCount) => {
    return totalCount === 0 ? 0 : (count / totalCount) * 100;
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <div className="navbar-collapse  justify-content-center">
            <div class="row justify-content-around navbar-nav ml-auto">
              <div class="col-6 nav-item">
                <span className="nav-link">Cats: {catCount}</span>
                <div className="progress" style={{ width: '400px' }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${calculatePercentage(catCount, catCount + dogCount)}%` }}
                    aria-valuenow={catCount}
                    aria-valuemin="0"
                    aria-valuemax={catCount + dogCount}
                  ></div>
                </div>
              </div>
              <div class="col-6 nav-item">
                <span className="nav-link">Dogs: {dogCount}</span>
                <div className="progress" style={{ width: '400px' }}>
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: `${calculatePercentage(dogCount, catCount + dogCount)}%` }}
                    aria-valuenow={dogCount}
                    aria-valuemin="0"
                    aria-valuemax={catCount + dogCount}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <h1 className="text-center">Who is the best between the two ?</h1>
        <div className="row">
          <div className="col-md-6">
            <ImageComponent
              imageUrl={catImageUrl}
              onImageClick={() => handleImageClick('Cat Image')}
              onAnimationComplete={handleAnimationComplete}
              altText="Cat Image"
            />
          </div>
          <div className="col-md-6">
            <ImageComponent
              imageUrl={dogImageUrl}
              onImageClick={() => handleImageClick('Dog Image')}
              onAnimationComplete={handleAnimationComplete}
              altText="Dog Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;