import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../components_css/Orders.css';
import SideBar from './SideBar';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        if (isNaN(year) || isNaN(month) || isNaN(day)) return dateString;
        return `${year}/${month}/${day}`;
    } catch (e) {
        return dateString;
    }
};

const STATUS_OPTIONS = ['Waiting', 'In Progress', 'Completed'];

function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [updatingStatusOrderId, setUpdatingStatusOrderId] = useState(null);

    const userId = localStorage.getItem('loggedInUserId');

    const fetchOrders = useCallback(async () => {
        if (!userId) {
            setError("User not logged in or user ID not found.");
            setIsLoading(false);
            setOrders([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:3000/orders`, {
                 params: { userId: userId }
            });
            setOrders(response.data || []);
        } catch (err) {
            console.error("Error fetching user orders:", err);
            setError(err.response?.data?.error || err.message || 'Failed to fetch your orders.');
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const filteredOrders = orders.filter(order => {
         const searchLower = searchTerm.toLowerCase();
         return (
             (order.name?.toLowerCase() || '').includes(searchLower) ||
             (order.order_number?.toString() || '').includes(searchLower) ||
             (order.description?.toLowerCase() || '').includes(searchLower) ||
             (order.phone?.toString() || '').includes(searchLower) ||
             (order.status?.toLowerCase() || '').includes(searchLower)
         );
    });

    const totalEntries = filteredOrders.length;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredOrders.slice(indexOfFirstEntry, indexOfLastEntry);

    const paginate = (pageNumber) => { 
         if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    const handleEntriesChange = (event) => { 
        setEntriesPerPage(Number(event.target.value));
        setCurrentPage(1);
    };
    const handleSearchChange = (event) => { 
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingStatusOrderId(orderId);
        setError(null);

        const originalOrder = orders.find(o => o.id === orderId);
        const originalStatus = originalOrder ? originalOrder.status : null;

        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );

        try {
             await axios.patch(`http://localhost:3000/orders/${orderId}/status`, { status: newStatus });
            console.log(`Order ${orderId} status updated to ${newStatus}`);
        } catch (err) {
            console.error(`Error updating status for order ${orderId}:`, err);
             setError(err.response?.data?.error || err.message || 'Failed to update status.');
             if (originalStatus) {
                 setOrders(prevOrders =>
                     prevOrders.map(order =>
                         order.id === orderId ? { ...order, status: originalStatus } : order
                     )
                 );
             }
        } finally {
            setUpdatingStatusOrderId(null);
        }
    };

    const getStatusBadgeClass = (status) => {
         const statusLower = String(status || '').toLowerCase().replace(/\s+/g, '-');
         switch (statusLower) {
            case 'waiting': return 'waiting';
            case 'in-progress': return 'in-progress';
            case 'completed': return 'completed';
            default: return 'default';
        }
    };

    if (isLoading) {
        return <div className="orders"><SideBar /><div className="loading-message">Loading Data...</div></div>;
    }

    if (error) {
        return <div className="orders"><SideBar /><div className="error-message">Error: {error}</div></div>;
    }

    return (
        <div className='orders'>
            <SideBar />
        <div className="orders-container">
            <div className="orders-header">
                 <div>
                    <h2>My Orders</h2>
                    <p>Your order details and history</p>
                </div>
            </div>
            <div className="orders-controls">
                 <div className="entries-control">
                    <label htmlFor="entries">Show</label>
                    <select id="entries" value={entriesPerPage} onChange={handleEntriesChange}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    <span>entries per page</span>
                </div>
                <div className="search-control">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="orders-table-wrapper">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Start Date</th>
                            <th>Order No.</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Budget</th>
                            <th>Phone</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEntries.length > 0 ? (
                            currentEntries.map(order => (
                                <tr key={order.id}>
                                    <td>{formatDate(order.start_date)}</td>
                                    <td>{order.order_number || 'N/A'}</td>
                                    <td>{order.name || 'N/A'}</td>
                                    <td>{order.description || 'N/A'}</td>
                                    <td>{order.budget ? `$${Number(order.budget).toFixed(2)}` : 'N/A'}</td>
                                    <td>{order.phone || 'N/A'}</td>
                                    <td>
                                        <select
                                            className="status-select"
                                            value={order.status || ''}
                                            onChange={(e) => handleStatusChange(order.order_number, e.target.value)}
                                            disabled={updatingStatusOrderId === order.order_number}
                                        >
                                            {STATUS_OPTIONS.map(statusOption => (
                                                <option key={statusOption} value={statusOption}>
                                                    {statusOption}
                                                </option>
                                            ))}
                                            {!STATUS_OPTIONS.includes(order.status) && order.status && (
                                                <option value={order.status}>{order.status} (Current)</option>
                                            )}
                                        </select>
                                         <span className={`status-badge ${getStatusBadgeClass(order.status)}`} style={{marginLeft: '10px'}}>
                                            {order.status || 'N/A'}
                                         </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>You have no orders matching the criteria.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalEntries > 0 && (
                 <div className="orders-footer">
                      <div>
                        Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries
                    </div>
                     <div className="pagination">
                          <button onClick={() => paginate(1)} disabled={currentPage === 1}>{'<<'}</button>
                          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
                          {[...Array(totalPages).keys()].map(number => (
                             <button key={number + 1} onClick={() => paginate(number + 1)} className={currentPage === number + 1 ? 'active' : ''}>
                                {number + 1}
                            </button>
                         ))}
                          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</button>
                          <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>{'>>'}</button>
                     </div>
                 </div>
             )}
        </div>
        </div>
    );
}

export default Orders;