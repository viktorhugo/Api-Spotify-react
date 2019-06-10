import React, { Component } from 'react';
import './bootstrap.minmint.css';
import Buscador from './components/Buscador';
import axios from 'axios';
import Resultado from './components/Resultado';
import Inicio from './components/Inicio';
//import SpotifyWebApi from 'spotify-web-api-node';
class App extends Component {

  state = { //this.state
    albums: [],
    user: null,
    identificador:true
  }

  datoBusqueda = nameAlbum => {  
    axios.post(`http://localhost:9000/search:${nameAlbum}`)
    .then(res => {
      const albums = res.data.albums; 
      const user = res.data
      console.log(user.message); 
      this.setState({ albums });
      this.setState({ user });
    })
  }

  onClicked = estado => this.setState({ identificador: !this.state.identificador});   

  showData(){
    if (this.state.identificador ) {
      return(
          <div className="App container mt-5 ">
            <div className="jumbotron">  
              <p className="lead text-center">Buscador de Albumnes </p>
              <Buscador datoBusqueda={this.datoBusqueda}/>
            </div>
            <Resultado datos={this.state.albums}/>
          </div>
      )  
    }else{
      return(      
          <Inicio estado = {this.onClicked} />       
      )     
    }
  }
  render() {  
    return (
      <React.Fragment>
        {this.showData()}
      </React.Fragment>           
    );
  }
}

export default App;
