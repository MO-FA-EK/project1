import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components_css/SideBar.css';
import UserImg from '../assets/user.png'

function SideBar() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <div className="side-bar">
            <ul>
                <li className='user-image'>
                    <img src={UserImg} alt='user-image'></img>
                    <p style={{marginBottom: '15px'}}>Welcome back <br/><strong><i><span>{username}!</span></i></strong></p>
                </li>
                <li>
                    <button onClick={() => navigate('/dashboard')} className="sidebar-button">
                        Dashboard
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/dashboard/profile')} className="sidebar-button">
                        Your Profile
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/dashboard/orders')} className="sidebar-button">
                        Orders
                    </button>
                </li>
                <li style={{ marginTop: '140px' }}>
                    <hr/>
                    <button onClick={() => navigate('/dashboard')} className="sidebar-button">
                        Settings
                    </button>
                </li>
                <li>
                    <button onClick={handleLogout} className="logout-button">
                        Logout ({localStorage.getItem('username')})
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;