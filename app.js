 // pour lancer le server utiliser la commande suivante :
 // node -r dotenv/config app.js dotenv_config_path=private/lib/src/.env
 console.log (process.env.APIKEY);
 var ent = require ('ent');
 var bodyParser = require ('body-parser');
 var urlencodedParser = bodyParser.urlencoded ({
     extended: false
 });
 var moment = require ('moment');
 var session = require ('cookie-session');
 var express = require ('express');
 var app = express ();
 app.set ('view engine', 'ejs');
 var http = require ('http');
 const fs = require ('fs');
 
//api fortnite
//const fortniteapi = require('fortnite-api-js');
//
//fortniteapi.configuration({
//    key: 'authorization'
//});
//fortniteapi.getShop('fr').then(data => {
//    console.log(data);
//});
//fortniteapi.getItem('208f8a9-35aff6e-b1ae608-1cb4c7b').then(data => {
//    console.log(data);
//});
// fonction pour consulter les infos des videos, à rafraichir a chque nouvelle entrée sur la chaine

//provisoirement stocké ici en attendant mieux, les JSON des vignettes manga, culture ....

 var titan = {
     rep: 'titan',
     title: 'L\'attaque des titans',
     description: {
         author: 'Hajime Isayama',
         genre: 'Action, dark fantasy, horreur, mystère, tragédie, thriller',
         pitch: 'L’histoire tourne autour du personnage d’Eren Jäger dans un monde où l’humanité vit entourée d’immenses murs pour se protéger de créatures gigantesques, les Titans. Le récit raconte le combat mené par l’humanité pour reconquérir son territoire, en éclaircissant les mystères dus à l’apparition des Titans. '
     }
 };

// récupère les infos au format json de l'api youtube data puis les écrits dans un fichier public/src/video.json

 var getApiInfoThenWrite = function () {
     console.log ('entree dans getApiInfoThenWrites()');
     return new Promise (function (resolve, reject) {
         var myYT = require ('@micmac/youtube');
         var getAllVideos = myYT.getAllVideosInfos;
         getAllVideos ().catch (function (error) {
             console.log ('erreur loading youtube info');
             reject (error);
         }).then (function (response) {
             console.log ('loading youtube info : ');
             var dataString = JSON.stringify (response);
             var dataJSON = response;
             fs.writeFile ('public/src/video.json', dataString, function (error) {
                 if (error)
                     {
                         console.log ('écriture erreur');
                         reject (error);
                     }
                 else
                     {
                         console.log ('write File OK !');
                         resolve (dataJSON);
                     }
             });
         });
     }, function (error, response) {
         if (error)
             {
                 reject (error);
             }
         if (response)
             {
                 resolve (response);
             }
     });
 };

// fonction lecture du fichier public/src/video.json 

 readVideoJSON = function () {
     return new Promise (function (resolve, reject) {
         fs.readFile ('public/src/video.json', 'utf8', function (err, data) {
             if (err)
                 {
                     console.log ('erreur de lecture');
                     console.log (err);
                     reject (err);
                 }
             if (data)
                 {
                     console.log ('lecture OK');
                     console.log (data);
                     resolve (JSON.parse (data));
                 }
         });
     });
 };

 




// fonction appel de getAndWrite() puis renvoie la lecture de public/src/video.json sous forme de json. 

 var readApiThenRecordThenRead = function () {
     getApiInfoThenWrite ().then (function (response) {
         if (response)
             {
                 console.log ('ecriture ok!');
                 readVideoJSON ().then (function (response) {
                     console.log ('lecture en sortie ok');
                     console.log (response);
                     return response;
                 });
             }
     }).catch (function (error) {
         console.log ('error capté en sortie :');
         console.log (error);
     });
 };
 
 readVideoJSON().then(function(response) {
     serverStart(response);
 });
 
 // fonction démarrage du serveur
 var serverStart = function (videoData) {
     var server = http.createServer (app);
     var io = require ('socket.io').listen (server);

// use res.render to load up an ejs view file

     console.log (moment ().format ('MMMM Do YYYY, h:mm:ss a'));
     console.log (process.env.PORT + 'is the magic port');
     app.use (session ({
         secret: 'todotopsecret'
     }));
     app.use ('/public', express.static ('public'))
             // index page 
             .get ('/', function (req, res) {
                 var params = {
                     css: 'global.css',
                     carroussel: titan,
                     video: videoData
                 };
                 res.render ('pages/index.ejs', {
                     params: params
                 });
             })
             .get ('/video', function (req, res) {
                 searchThisVideo.goToVideoPage (searchVideos.allVideos[req.query.no].idVideo, 'global.css', res, 'pages/videoActivity.ejs');
             })

// about page 
             .get ('/test', function (req, res) {
                 console.log ('test');
                 youtube.searchVideos ();
                 var params = {
                     css: 'videoPage1.css'
                 };
                 res.render ('pages/test.ejs', {
                     params: params
                 });
             });
     io.sockets.on ('connection', function (socket) {
         socket.emit ('message', {
             content: 'Vous êtes bien connecté !',
             importance: '1'
         });
         socket.on ('nouveauClient', function () {

             console.log ("nouveau client");
         })
                 .on ('connexionIndex', function () {
                     socket.emit ('identification');
                     socket.broadcast.emit ('entree');
                 })
                 .on ('message', function (message, noOfSouth) {

                 })
                 .on ('move', function (_leftF, _topF, _time, _anim) {

                 })
                 .on ('disconnect', function (reason) {
                     console.log (reason);
                     // clients.splice(i, 1);
                     // clientsInfo.splice(i, 1);
                 });
     });
     server.listen (process.env.PORT);
 };



    