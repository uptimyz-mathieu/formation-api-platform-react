import React, {useState} from "react";
import axios from "axios";
import Field from "../components/forms/Field";

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await axios
                .post("http://localhost:8000/api/login_check")
                .then(response => console.log(response));
        } catch (error) {
            console.log(error.response);
            setError(
                "Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas !"
            );
        }

        console.log(credentials);
    }

    return (
        <>
            <h1>Connexion à l'application</h1>

            <form onSubmit={handleSubmit}>
                <Field label="Adresse email" name="username" value={credentials.username} onChange={handleChange}
                       placeholder="Adresse email de connexion" error={error} />
                <Field name="password" label="Mots de passe" value={credentials.password} onChange={handleChange}
                       type="password" error=""/>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Je me connecte
                    </button>
                </div>
            </form>
        </>
    );
};

export default LoginPage;