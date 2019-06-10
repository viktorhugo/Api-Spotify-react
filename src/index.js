import app from './app';
import connect from './config/conect_db';


async function main() {
    
    //Initialize Server
    await app.listen(process.env.PORT, () => {
        console.log(`App listening on port ${process.env.PORT} !`); 
    });
    //Connection With MongoDb
    await connect()
}

main()