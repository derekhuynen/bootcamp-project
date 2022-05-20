import { Link} from "react-router-dom";
import React from "react";
import './Navbar.css'

export default function Navbar() {
  return (
    <div className="navbar">
        <div className="link_list">
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="/admin">Admin</Link>
            <Link className="link" to="/edit">Edit Admin</Link>
        </div>
    </div>
  );
}
