import {Router} from 'express';
import keys from '../config/keys';
import passport from 'passport';
import passportSpotify from 'passport-spotify';
import SpotifyWebApi from 'spotify-web-api-node';
import modelAlbum from '../models/albumsModel';
import mongoose from 'mongoose';

const router = Router(),
    SpotifyStrategy = passportSpotify.Strategy

    // credentials 
const spotifyApi = new SpotifyWebApi({
    clientId: keys.data.CLIENT_ID,
    clientSecret: keys.data.CLIENT_SECRET,
    redirectUri: keys.data.REDIRECT_URI
  });

//------------------PassportSpotify-------------

export function initPassport(app) { 
    app.use(passport.initialize()); 
    app.use(passport.session()); 
}

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
      done(null, user);
});

passport.use(
    new SpotifyStrategy(
      {
        clientID: keys.data.CLIENT_ID,
        clientSecret: keys.data.CLIENT_SECRET,
        callbackURL: keys.data.REDIRECT_URI
      },
    function(accessToken, refreshToken, expires_in, profile, done) {
        // asynchronous verification, for effect...
            spotifyApi.setAccessToken(accessToken);
            
            return done(null, profile, accessToken, refreshToken, expires_in);
      }
    )
  );


//---------Routes---------------------------------
router.get('/auth/spotify',
    passport.authenticate('spotify', {
      scope: ['user-read-email', 'user-read-private', 'user-library-read'],
      showDialog: true
    })
);
  
router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/login' }),
    function(req, res) {
        //console.log(req.session.bacURL);
        res.redirect(req.session && 'http://localhost:3000')
    }
);

router.get('/inicio',async  (req, res) => {          
    res.render('index')
  });


router.post('/search:nameAlbum', (req, res) => {
    console.log(req.params);
    
    const { nameAlbum }= req.params
     spotifyApi.search( nameAlbum, ['album'], { limit : 30, offset : 10 })
      .then( (data) => {

        data.body.albums.items.forEach(async item => {
          try {
            const {
              album_type ,
              artists,
              available_markets,
              external_urls,
              href,
              id,
              images,
              name,
              release_date,
              release_date_precision,
              total_tracks,
              type,
              uri 
            } = item
            const find = await modelAlbum.find({ id })            
            if (find.length > 0) {
              console.log(`el album ${name} ya se encuentra registrado en la base de datos`);             
            }else{
              const newAlbum = new modelAlbum({
                album_type,
                artists,
                available_markets,
                external_urls,
                href, 
                id,         
                images,
                name,
                release_date,
                release_date_precision,
                total_tracks,
                type,
                uri 
              })
              await newAlbum.save()
            }
          } catch (error) {
            
          }
          
        });
        res.json({
            albums: data.body.albums.items,
            user: req.user
        });
      }, function(err) {
        console.error(err);
      });
});

router.get('/login', function(req, res) {
    res.json({ mesagge: 'NO LOGEADO' });
});

router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy()
    res.redirect('/inicio');
});

function ensureAuthenticated(req, res, next) {
    console.log(req.session);    
    if (req.isAuthenticated()) {
      //session.passport.user !== undefined
      return next();
    }else {
        res.redirect('/login');
    }
    
}
//----------------export router---------------------
export default router


