import React from "react";
import {NavLink} from "react-router-dom";

const Navbar = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">SymReact</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Clients</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a href="#" className="btn btn-primary">
                            Inscription
                        </a>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login" className="btn btn-secondary">
                            Connexion !
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="btn btn-primary">
                            Déconnexion
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>);
}

export default Navbar;