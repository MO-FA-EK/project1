import React from 'react';
import '../components_css/Profile.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import SideBar from './SideBar';

function Profile() {

    const category = localStorage.getItem('category');
    const description = localStorage.getItem('description');
    const portfio = localStorage.getItem('portfio');
    const email = localStorage.getItem('email');

    return (
        <div className='profile'>
            <SideBar />
        <div className="profile-page-container">
            <div className="profile-info-card">
                <h3>Information</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <span className="info-label">Email</span>
                        <p className="info-value">{email}</p>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Phone</span>
                        <p className="info-value"></p>
                    </div>
                </div>

                <h3>Projects</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <span className="info-label">Category</span>
                        <p className="info-value">{category}</p>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Description</span>
                        <p className="info-value">{description}</p>
                    </div>
                </div>

                <div className="social-icons">
                    <a href={portfio} target="_blank" rel="noopener noreferrer" aria-label="Facebook profile">
                        <FaFacebookF />
                    </a>
                    <a href='/' target="_blank" rel="noopener noreferrer" aria-label="Twitter profile">
                        <FaTwitter />
                    </a>
                    <a href='/' target="_blank" rel="noopener noreferrer" aria-label="Instagram profile">
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Profile;