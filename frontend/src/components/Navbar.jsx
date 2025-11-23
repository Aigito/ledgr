import React from 'react'
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/chart-of-account">Chart of Accounts</Link></li>
          <li><Link to="/about">About</Link></li>
          <li>
            <details>
              <summary>Add</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li><a>Account</a></li>
                <li><a>Transaction</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
