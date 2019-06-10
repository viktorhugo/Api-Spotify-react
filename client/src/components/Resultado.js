import React, { Component } from 'react';
import Album from './Album';
class Resultado extends Component {
    
    mostrarDatos = () => {
        const albumns = this.props.datos
     
            return(
                <React.Fragment>
                    <div className="col-12 p-5 row">
                        { albumns.map(album => (
                            <Album 
                            key={album.id}
                            datosAlbum={album}
                            />
                        ))}
                    </div>
                </React.Fragment>
            )        
    }
    render() {
        return (
                <React.Fragment>
                    {this.mostrarDatos()}
                </React.Fragment>    
        );
    }
}

export default Resultado;