 // pour lancer le server utiliser la commande suivante :
 // node -r dotenv/config app.js dotenv_config_path=/.env
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
 var myYT = require ('@micmac/youtube');
 const getAllVideos = myYT.getAllVideos;
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
     rep: "titan",
     article: "Un manga à dévorer !",
     intro: "L'attaque des titans c'est aussi, les 3 premières saisons d'un animé disponible sur NetFix, des jeux vidéos et même un film en préparation",
     title: "L'attaque des titans",
     description: {
         author: "Hajime Isayama",
         genre: "Action, dark fantasy, horreur, mystère, tragédie, thriller",
         pitch: "L’histoire tourne autour du personnage d’Eren Jäger dans un monde où l’humanité vit entourée d’immenses murs pour se protéger de créatures gigantesques, les Titans. Le récit raconte le combat mené par l’humanité pour reconquérir son territoire, en éclaircissant les mystères dus à l’apparition des Titans. "
     }
 };

// récupère les infos au format json de l'api youtube data puis les écrits dans un fichier public/src/video.json

 var getApiInfoThenWrite = async function () {
     var responseGetAllVideos = await getAllVideos ();
     var dataString = JSON.stringify (responseGetAllVideos);
     var writeJson = new Promise (function (resolve) {
         fs.writeFile ('public/src/video.json', dataString, function (error) {
             if (error)
                 {
                     console.log ('erreur d\'écriture getAllVideos fs.writeFile');
                     throw new Error ('erreur d\'écriture getAllVideos fs.writeFile #');
                 }
             resolve (responseGetAllVideos);
         });
     });
     var result = await writeJson.then (function (data) {
//         console.log ('réponse de getApiInfoThenWrites()');
//         console.log ('----------------------');
//         console.log (data);
         return data;
     });
//     console.log ('réponse de getApiInfoThenWrites()');
//     console.log ('----------------------');
//     console.log (result);
     return result;
 };

// fonction lecture du fichier public/src/video.json 

 var readVideoJSON = async function () {
     var readJson = new Promise (function (resolve) {
         fs.readFile ('public/src/video.json', 'utf8', function (err, data) {
             if (err)
                 {
                     console.log ('erreur de lecture readVideoJSON');
                     console.log (err);
                     throw new Error ('erreur de lecture readVideoJSON #');
                 }
             var responseReadVideoJSON = data;
             resolve (responseReadVideoJSON);
         });
     });
     var result = await readJson.then (function (data) {
//         console.log ('réponse de readVideoJSON() : ');
//         console.log ('-------------------------------');
//         console.log (data);
         return data;
     });
//     console.log ('réponse de readVideoJSON() : ');
//     console.log ('-------------------------------');
//     console.log (result);
     return result;
 }
 ;

// fonction appel de getAndWrite() puis renvoie la lecture de public/src/video.json sous forme de json. 

 var readApiThenRecordThenRead = async function () {
     var responseAfterRead = await getApiInfoThenWrite ().then (async function (result) {
//         console.log ('réponse de readApiThenRecordThenRead : ');
//         console.log ('-------------------------------');
//         console.log (result);
         var result2 = await readVideoJSON ();
         return result2;
     });
//     console.log ('lecture en sortie readVideoJSON : ');
//     console.log ('-------------------------------');
//     console.log (responseAfterRead);

     return responseAfterRead;
 }
 ;

 
 // fonction démarrage du serveur

 var serverStart = function (videoData) {
//console.log('data rection :');
//console.log(videoData);
     var server = http.createServer (app);

     console.log ('Démarrage Serveur le : ' + moment ().format ('MMMM Do YYYY, h:mm:ss a'));
     console.log (process.env.PORT + 'is the magic port');
     app.use (session ({
         secret: 'todotopsecret'
     }))
             .use ('/public', express.static ('public'))
             // index page 
             .get ('/', function (req, res) {
                let params = {
                     css: 'global.css',
                     video: JSON.stringify(videoData),
                     carroussel: titan,
                     myParam: {
                         pseudo: req.query.pseudo,
                         chatOptions: {
                             color: req.query.color,
                             style: req.query.style
                         },
                         socket: {
                             id: req.query.idSocket
                         }
                     }
                 };
//                 console.log ("params envoyé vers index.ejs : ");
                 console.log (params.video);
                 
                 res.render ('pages/index.ejs', {
                     params: params
                 });
             })
             .get ('/googlef76e7a236c78cd16.html', function (req, res) {
                 res.render ('pages/googlef76e7a236c78cd16.ejs');
             })
             .get ('/video', function (req, res) {
                 console.log('video !!!!!');
                 let videoTheme = findTheme (videoData[req.query.noVideo]);
                 let params = {
                     css: 'videoPage1.css',
                     video: videoData[req.query.noVideo],
                     theme: videoTheme,
                     myParam: {
                         pseudo: req.query.pseudo,
                         chatOptions: {
                             color: req.query.color,
                             style: req.query.style
                         },
                         socket: {
                             id: req.query.idSocket
                         }
                     }
                 };
                 console.log ("params envoyé vers videoActiviy.ejs : ");
                 console.log (params);
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
     chatOn (server);
     server.listen (process.env.PORT);
 };


 // fonction chat

 var chatOn = function (_server) {
     var io = require ('socket.io').listen (_server);
     var listClient = new Array ();
     // 2 fonctions de tri de socket dans la liste des clients

     function filterOtherSocketId (_listClient) {
         if (_listClient.socketId === this.id)
             {
                 console.log ('filter filterOtherSocketId false : ' + _listClient.socketId + '...' + this.id);
                 return false;
             }
         else
             {
                 console.log ('filter filterOtherSocketId true : ' + _listClient.socketId + '...' + this.id);
                 return true;
             }
     }
     ;
     function filterThisSocketId (_listClient) {
         if (_listClient.socketId === socket.id)
             {
                 console.log ('filter filterThisSocketId true : ' + _listClient.socketId + '...' + socket.id);
                 return true;
             }
         else
             {
                 console.log ('filter filterThisSocketId false : ' + _listClient.socketId + '...' + socket.id);
                 return false;
             }
     }
     ;
     io.sockets.on ('connection', function (socket) {
         console.log ("Nouvelle connexion socket.ID : " + socket.id);
         socket.emit ('messageServer', {
             text: 'connection serveur.',
             importance: '1'
         })
                 .on ('entry', function (pseudo) {
                     console.log ("nouveau client : " + pseudo);
                     console.log ("ID : " + socket.id);
                     listClient.push ({
                         socketId: socket.id,
                         pseudo: pseudo
                     });
                     socket.dialog = {
                         pseudo: pseudo,
                         socketId: socket.id,
                         message: new Array ()
                     };
                     socket.emit ('identification', listClient);
                     socket.broadcast.emit ('validEntry', listClient.slice (- 1)[0].pseudo);
                     socket.broadcast.emit ('message', {
                         text: socket.dialog.pseudo + ' a rejoint le salon.'
                     }, 'Serveur :');
                 })
                 .on ('message', function (_message, _color) {
                     socket.dialog.message.push ({
                         text: _message,
                         color: _color
                     });
                     socket.broadcast.emit ('message', socket.dialog.message.slice (- 1)[0], socket.dialog.pseudo);
                     socket.emit ('message', socket.dialog.message.slice (- 1)[0], socket.dialog.pseudo);
                     console.log (_message);
                 })
                 .on ('disconnect', function () {
                     console.log ('ListClient avant déconnexion');
                     console.log (listClient);
                     listClient = listClient.filter (filterOtherSocketId.bind (socket));
                     if (socket.dialog !== undefined)
                         {
                             socket.broadcast.emit ('leave', listClient);
                             socket.broadcast.emit ('messageServer', {
                                 text: socket.dialog.pseudo + ' a quitté le salon.'
                             }, 'Serveur :');
                             console.log ('Clients toujours connectés : ');
                             console.log (listClient);
                         }
                 });
     });
 };
 var start = async function () {
    var finalResponse = await readApiThenRecordThenRead ();
//     console.log ('§§§§§§§§§§§§§§§§§§§ FINAL §§§§§§§§§§§§§§§§§§§');
//     console.log (finalResponse);
var finalResponse = await readVideoJSON ();
     serverStart (JSON.parse(finalResponse));
 }
 ;

 start ();

 // fonction pour déterminer le theme d'une video

 function findTheme (_video) {
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