import React from 'react';

const HomePage = (props) => {
    return (<div className="jumbotron">
        <h1 className="display-3">Salut, Monde!</h1>
        <p className="lead">Voici un texte qui n'a aucune importance avec sûrement pleins de faute d'orthographe
            vue que je ne sais pas bien écrire. Vive la république, vive la France. (Et la Suisse)</p>
        <hr className="my-4"/>
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="#" role="button">Saitama > all</a>
            </p>
    </div> );
}

export default HomePage;