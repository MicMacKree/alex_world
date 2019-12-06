 // pour lancer le server utiliser la commande suivante :
 // node -r dotenv/config app.js dotenv_config_path=private/lib/src/.env
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
// 

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

var readVideoJSON = function () {
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
                     resolve (JSON.parse (data));
                 }
         });
     });
 };

// fonction appel de getAndWrite() puis renvoie la lecture de public/src/video.json sous forme de json. 

 var readApiThenRecordThenRead = function () {
     return new Promise (function (resolve, reject) {
         getApiInfoThenWrite ().then (function (response) {
             console.log ('ecriture ok!');
             readVideoJSON ().catch (function (error) {
                 console.log (error);
             }).then (function (response) {
                 console.log ('lecture en sortie ok');
                 resolve (response);
             });
         });
     });
 };
 
 // fonction pour déterminer le theme d'une video

 var findTheme = function (_video) {
     var theme = 'other';
     _video.tags.forEach (function (tag) {
         let lowTag = tag.toLowerCase ();
         switch (lowTag)
             {
                 case 'fortnite':
                     theme = 'fortnite';
                     console.log ('Theme fortnite');
                     break;
                 case 'nature':
                     theme = 'nature';
                     console.log ('Theme nature');
                     break;
                 case 'gravitrax':
                     theme = 'gravitrax';
                     console.log ('Theme gravitrax');
                     break;
                 case 'simcity':
                     theme = 'simcity';
                     console.log ('Theme simcity');
                     break;
             }
     });
     return theme;
 }; 
 
 
 //readApiThenRecordThenRead ().then (function (response) {
  readVideoJSON ().then (function (response) {
     serverStart (response);
 });

 // fonction démarrage du serveur
 
 var serverStart = function (videoData) {
     
     var server = http.createServer (app);
     var io = require ('socket.io').listen (server);

     console.log (moment ().format ('MMMM Do YYYY, h:mm:ss a'));
     console.log (process.env.PORT + 'is the magic port');
     app.use (session ({
         secret: 'todotopsecret'
     }));
     app.use ('/public', express.static ('public'))
             // index page 
             .get ('/', function (req, res) {
                 let params = {
                     css: 'global.css',
                     carroussel: titan,
                     video: videoData
                 };
                 res.render ('pages/index.ejs', {
                     params: params
                 });
             })
             .get ('/googlef76e7a236c78cd16.html', function (req, res) {
                 res.render ('pages/googlef76e7a236c78cd16.ejs');
             })
             .get ('/video', function (req, res) {
                 let videoTheme = findTheme (videoData.video[req.query.noVideo]);
                 let params = {
                     css: 'videoPage1.css',
                     video: videoData.video[req.query.noVideo],
                     theme: videoTheme
                 };
//                 console.log (videoTheme);
//                 console.log (params);
                 res.render ('pages/videoActivity.ejs', {
                     params: params
                 });
             })

// page pour les test;

             .get ('/test', function (req, res) {
                 console.log ('test');
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
 
