import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import {Link} from "react-router-dom";
import customersAPI from "../services/customersAPI";
import axios from "axios";

const InvoicePage = props => {

    const [invoice, setInvoice] = useState({
        amount:"",
        customer: "",
        status: ""
    });

    const [customers, setCustomers] = useState([]);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setInvoice({ ...invoice, [name]: value});
    };

    const [errors, setErrors] = useState({
        amount:"",
        customer: "",
        status: ""
    })

    const fetchCustomers = async () => {
        try {
            const data = await customersAPI.findAll();
            setCustomers(data);
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/invoices", { ...invoice, customer:
                    `/api/customers/${invoice.customer}`
            });
            console.log(response);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <>
            <h1>Création d'une facture</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name="amount"
                    type="number"
                    placeholder="Montant de la facture"
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                    error={errors.amount}
                />

                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
                >
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.firstName} {customer.lastName}
                        </option>
                    ))}
                </Select>
                <Select name="status" label="Statut" value={invoice.status} error={errors.status}
                        onChange={handleChange}>
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Enregistrer
                    </button>
                    <Link to="/invoices" className="btn btn-link">
                        Retour aux factures
                    </Link>
                </div>
            </form>
        </>
    );
};

export default InvoicePage;