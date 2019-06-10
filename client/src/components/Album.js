import React from 'react';

const Album = (props) => {
    const {artists,images,name, album_type, href, id, release_date, total_tracks, uri} = props.datosAlbum
    const allArtists = artists.map( item => item.name)
    return(
        <div className="card mb-2" >
            <div className="row ">
                <div className="col-md-6">
                    <img src={images[1].url} className="card-img text-center" alt="..."/>
                </div>
            <div className="col-md-6">
                <div className="card-body">
                    <h5 className="card-title">Album: {name}</h5>
                    <p className="card-text"> id Album: {id}</p>
                    <p className="card-text"> Total Canciones: {total_tracks}</p>
                    <p className="card-text"> Artistas: {allArtists}</p>
                    <p className="card-text"> Tipo Album: {album_type}</p>
                    <p className="card-text"> Href: {href}</p>
                    <p className="card-text"> Uri: {uri}</p>
                    <p className="card-text"><small className="text-muted" >Fecha lanzamiento: {release_date}</small></p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Album