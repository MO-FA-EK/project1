import React from 'react';
import SideBar from './SideBar';
import '../components_css/Dashboard.css'
import DashboardImg from '../assets/dashboard.png'

function Dashboard() {
    

    return (
        <div className='dashboard'>
            <SideBar/>
            <div className='dashboard-container'>
                <img src={DashboardImg} alt='Dashboard'></img>
            </div>
        </div>
    );
}

export default Dashboard;