import React from "react"
import {Link} from "react-router-dom";
import {FaClipboardList, FaUser, FaUtensils} from "react-icons/fa";
import "./Header.css"

export default function Header() {
    return (
        <div className="header">
            <Link to="/" className="header-icon">
                <FaUser/>
                <span>Login</span>
            </Link>
            <Link to="/menu" className="header-icon">
                <FaUtensils/>
                <span>Menu</span>
            </Link>
            <Link to="/orders" className="header-icon">
                <FaClipboardList/>
                <span>Orders</span>
            </Link>
        </div>
    )
}