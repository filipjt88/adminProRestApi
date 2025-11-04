import React from "react";

export default function Navbar({ OnAddUser }) {
    return(
        <nav className="navbar navbar-dark bg-dark mb-4">
            <div className="container">
                <span className="navbar-brand mb-0 h1">Admin Pro REST API</span>
                <button className="btn btn-outline-light" onClick={OnAddUser}> + Dodaj novog korisnika</button>
            </div>
        </nav>
    );
}