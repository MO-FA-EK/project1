import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

  return (
    <div className="home-landing">
      <div className="home-main">
        <div className="home-left">
          <h1>Join our team<br/>Be our Developer.</h1>
          <p>Qwilr helps you to be a developer: easy, fast and beautiful.</p>
          <button className="get-started-btn" onClick={() => navigate('/register')}>Get Started →</button>
        </div>
        <div className="home-right">
          <div className="phone-mockup phone-mockup-1">
            <img src="https://placehold.co/200x400?text=Phone+1" alt="Phone 1" />
          </div>
          <div className="phone-mockup phone-mockup-2">
            <img src="https://placehold.co/200x400?text=Phone+2" alt="Phone 2" />
          </div>
        </div>
      </div>
      <div className="home-footer">
        <span>OVER 50,000 DEVELOPERS <span style={{color: '#F25F5C'}}>❤</span> </span>
      </div>
    </div>
  );
}

export default Home; 