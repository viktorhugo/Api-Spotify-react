import mongoose from 'mongoose'



const schemaAlbum = new mongoose.Schema({
        album_type: { type:String },
        artists:{ type: Array},
        available_markets:{ type: Array},
        external_urls:{ type: Array},
        href:{ type: String},
        id:{ type: String},
        images:{ type: Array},
        name:{ type: String},
        release_date:{ type: Date},
        release_date_precision:{ type: String},
        total_tracks:{ type: Number},
        type:{ type: String},
        uri:{ type: String},
});

const modelAlbum = new mongoose.model('albumnes', schemaAlbum);

export default modelAlbum;