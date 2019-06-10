import mongoose from 'mongoose'
import conf from './db-conf';

export async function connect() {
    try {
        const db = await mongoose.connect(`mongodb://${conf.mongo.host}/${conf.mongo.database}`,{ useNewUrlParser: true } )
         db ? console.log('Connected MongoDb') : console.log('Error Connected Whit MongoDB')           
    } catch (e) {
        throw e
    }
}

export default connect