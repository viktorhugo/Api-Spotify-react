import React, { Component } from 'react';

class Buscador extends Component {

    buscarAlbum = React.createRef() // accede a lo que el usuario escribe en el input

    traerDatos = e => {
        e.preventDefault();
        const nameAlbum = this.buscarAlbum.current.value  //toma el valor del input
        this.props.datoBusqueda(nameAlbum) //  se le envia al componente principal   
    }
    render() {
        return (
            <form onSubmit={this.traerDatos}>
                <div className="row"> 
                    <div className=" form-group col-md-8">
                        <input type="text" ref={this.buscarAlbum} className="form-control form-control-lg" 
                        placeholder="Busca tu album. Ejemplo: Cholo y sus caballos"/>                    
                    </div>
                    <div className=" form-group col-md-4">
                        <input type="submit" className="bnt btn-lg btn-info btn-block" value="Buscar" />
                    </div>
                </div>    
            </form>
        );
    }
}

export default Buscador;