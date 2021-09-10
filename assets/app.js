import React from "react";
import ReactDOM from "react-dom";
import {HashRouter, Switch, Route, Router} from "react-router-dom";
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import CustomerPage from "./pages/CustomerPage";
import InvoicePage from "./pages/InvoicePage";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//require("../styles/app.css");

// start the Stimulus application
// import './bootstrap';

console.log("Hello World !!");

const App = () => {
    return (
    <HashRouter>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
        <Navbar />

        <main className="container pt-5">
            <Switch>
                <Route path="/customers/:id" component={CustomerPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/invoices/:id" component={InvoicePage} />
                <Route path="/invoices" component={InvoicesPage} />
                <Route path="/customers" component={CustomersPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </main>
        </HashRouter>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);