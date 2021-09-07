import React, {useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import axios from "axios";
import moment from "moment";

const STATUS_CLASSES = {
    PAID: "success",
    SEND: "info",
    CANCELLED: "danger"
}

const STATUS_LABELS = {
    PAID: "Payée",
    SEND: "Envoyée",
    CANCELLED: "Annulée"
}

const InvoicesPage = (props) => {

    const [invoices, setInvoices] = useState([]);

    const fetchInvoices = async () => {
        try {
            const data = await axios
                .get("http://127.0.0.1:8000/api/invoices")
                .then(response => response.data["hydra:member"]);
            setInvoices(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    return (
        <>
            <h1>Liste des factures</h1>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th>Date d'envoi</th>
                        <th>Statut</th>
                        <th>Montant</th>
                    </tr>
                </thead>
                <tbody>
                {invoices.map(invoices => <tr key={invoices.id}>
                    <td>{invoices.chrono}</td>
                    <td>
                        <a href="#">{invoices.customer.firstName} {invoices.customer.lastName}</a>
                    </td>
                    <td>{formatDate(invoices.sentAt)}</td>
                    <td>
                        <span
                            className={"badge bg-" + STATUS_CLASSES[invoices.status]}
                        >
                            {STATUS_LABELS[invoices.status]}
                        </span>
                    </td>
                    <td>{invoices.amount.toLocaleString()} €</td>
                    <td>
                        <button className="btn btn-sm btn-primary">Editer</button>&nbsp;
                        <button className="btn btn-sm btn-danger">Supprimer</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
        </>
    );
};

export default InvoicesPage;