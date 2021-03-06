import React, {useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/customersAPI";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const CustomersPage = props => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Permet d'aller récupérer les customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data);
        } catch(error) {
            console.log(error.response)
        }
    }
    // Au changement du composant on va chercher les customers
    useEffect(() => {
        fetchCustomers();
    }, []);
    //Gestion supression customers
    const handleDelete = async id => {

        const originalCustomers = [...customers];

        // 1. L'approche Optimise
        setCustomers(customers.filter(customers => customers.id !== id))
        // 2. L'approche Pessimiste
        try {
            await CustomersAPI.delete(id)
            toast.warning("DELETE SUCESS !");
        } catch(error) {
            setCustomers(originalCustomers);
            console.log(error.response);
        }
    };
    //Gestion changement de page
    const handleChangePage = page => {
        setCurrentPage(page);
    };
    //Gestion de la recheche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const itemPerPage = 8;
    //Filtrage des Customers en fonction de la recherche
    const filteredCustomers = customers.filter(
        c =>
            c.firstName.toLowerCase().includes(search.toLowerCase()) ||
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
    )
    //Pagination des données
    const paginatedCustomers = Pagination.getData(
        filteredCustomers,
        currentPage,
        itemPerPage
    );

    return (
        <>

            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des client</h1>
                <Link to="/customers/new" className="btn btn-outline-light">
                    Créer un client
                </Link>
            </div>

            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher ..." />
            </div>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Id.</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th>Factures</th>
                    <th>Montant total</th>
                </tr>
                </thead>
                <tbody>
                {paginatedCustomers.map(customers =>
                    <tr key={customers.id}>
                    <td>{customers.id}</td>
                    <td>
                        <Link to={"/customers/" + customers.id}>
                            {customers.firstName} {customers.lastName}
                        </Link>
                    </td>
                    <td>{customers.email}</td>
                    <td>{customers.company}</td>
                    <td>{customers.invoices.length}</td>
                    <td>2 400,00 €</td>
                    <td>
                        <button
                            onClick={() => handleDelete(customers.id)}
                            disabled={customers.invoices.length > 0}
                            className="btn btn-sm btn-danger">Supprimer</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <TableLoader />

            {itemPerPage < filteredCustomers.length && (
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemPerPage}
                    lenght={filteredCustomers.length}
                    onPageChanged={handleChangePage}
                />
            )}
        </>
    );
};

export default CustomersPage;