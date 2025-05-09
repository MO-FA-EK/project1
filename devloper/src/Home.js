import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import image1 from "./assets/image.png"

function Home() {
    const navigate = useNavigate();

  return (
    <div className="home-landing">
      <div className="home-main">
        <div className="home-left">
          <h1>Join our team<br/>Be our Developer.</h1>
          <p>EasyJob helps you to be a developer: easy, fast and beautiful.</p>
          <button className="get-started-btn" onClick={() => navigate('/register')}>Get Started →</button>
        </div>
        <div className="home-right">
          <div className="image1">
            <img src={image1} alt="image1" />
          </div>
        </div>
      </div>
      <div className="home-footer">
        <span>EasyJob OVER 5,000 DEVELOPER <span style={{color: '#F25F5C'}}>❤</span> </span>
      </div>
    </div>
  );
}

export default Home; 