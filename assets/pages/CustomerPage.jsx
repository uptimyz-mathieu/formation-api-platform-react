import React, { useState, useEffect } from 'react';
import Field from "../components/forms/Field";
import LoginPage from "./LoginPage";
import {Link} from "react-router-dom";
import customersAPI from "../services/customersAPI";
import {toast} from "react-toastify";

const CustomerPage = ({match, history}) => {
    const { id = "new" } = match.params;

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const [editing, setEditing] = useState(false);

    // Récuperation du customers en focntion de l'id
    const fetchCustomer = async id => {
        try {
            const { firstName, lastName, email, company } = await customersAPI.find(id);
            setCustomer({ firstName, lastName, email, company });
        } catch (error) {
            console.log(error.response);
            // To do : Notif flash d'une erreur
            history.replace("/customers");
        }
    }


    //chargement du customers si besoin au changement du composant ou au changement de l'identifiant
    useEffect(() => {
        if(id !== "new") {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCustomer({ ...customer, [name]: value });
    }

    //Gestion de la la soumission du formulaire
    const handleSublit = async event => {
        event.preventDefault();

        try {
            if(editing) {
                const response = await customersAPI.update(id, customer);
            } else {
                const response = await customersAPI.create(customer);
                //To do : flash notif success
                history.replace("/customers");
                toast.success("Sucesse ! :-)");
            }
        } catch ({ response }) {
            const { violations } = response.data;

            if(violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });

                setErrors(apiErrors);

                // To do : Flash notification d'erreurs
            }
        }
    };

    return (
        <>
            {(!editing && <h1>Création d'un client</h1>) || (<h1>Modification du client</h1>)}

            <form onSubmit={handleSublit}>
                <Field
                    name="lastName"
                    label="Nom de famille"
                    placeholder="Nom de famille du client"
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field
                    name="firstName"
                    label="Prénom"
                    placeholder="Prénom du client"
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field
                    name="email"
                    label="Email"
                    placeholder="Adresse email du client"
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Field
                    name="company"
                    label="Entreprise"
                    placeholder="Entreprise du client"
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Enregistrer
                    </button>
                    <Link to="/customers" className="btn btn-link">
                        Retour à la liste
                    </Link>
                </div>
            </form>
        </>
    );
};

export default CustomerPage;