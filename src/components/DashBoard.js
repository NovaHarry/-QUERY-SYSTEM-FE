import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({title,children}){

    const navigate = useNavigate();
    return(
        <div>
            <div className="nav-bar">
                <h1>{title}</h1>
                <div className="profile">
                <span >Hariharan</span>
                </div>
            </div>
            <div className="children">{children}</div>
        </div>
    )
}