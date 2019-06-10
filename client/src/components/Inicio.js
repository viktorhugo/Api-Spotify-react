import React, { Component } from 'react'

class Inicio extends Component {
  
    cambioEstado(){       
        
        console.log(this.props.buscar)
    }
    render() {
        return (
            <div className=" container text-justify mt-5">
                <div className="jumbotron">
                {this.props.buscar}
                    <h1 className="display-4">Bienvenido App Spotify!</h1>
                    <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-4"/>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <a href="http://localhost:9000/auth/spotify" onClick={this.props.estado} >Inicia Sesión </a>
                </div>
            </div>
        );
    }
}

export default Inicio;