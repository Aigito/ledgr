import React from 'react'
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <h1>My Dashboard</h1>
      <div className="navbar-link-items">
        <Link to="/about">About</Link>
        <Link to="/chart-of-account">Accounts</Link>
        <Link to="/transaction-journal">Transactions</Link>
      </div>
    </div>
  )
}

export default Navbar;
