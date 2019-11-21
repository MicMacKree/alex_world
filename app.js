var ent = require('ent');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var moment = require('moment');
var session = require('cookie-session');
const { searchVideos } = require("@micmac/youtube");
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client

var server = http.createServer(app);
var io = require('socket.io').listen(server);

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

// use res.render to load up an ejs view file

console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));


console.log('8080 is the magic port');
app.use(session({secret: 'todotopsecret'}))
        //console.log(__dirname);
        .use('/public', express.static('public'))
        // index page 
        .get('/', function (req, res) {
            var params = {
                css: 'global.css',
                video: searchVideos
            };
            console.log (params.video);
            res.render('pages/index.ejs', {
                params: params
            });
        })
        .get('/video', function (req, res) {
            var video = {
                url: "https://www.youtube.com/embed/6eiDDZEWQYE?ecver=1&amp;autoplay=1&amp;iv_load_policy=1&amp;yt:stretch=4:3&amp;autohide=1&amp;color=red&amp;width=800&amp;width=400",
                game: "simcity",
                article: {
                    titre: "Je suis le maire de YouTube-City !!",
                    paragraphe1: "Quand je ne suis pas en train de faire un top 1 sur Fortnite, je gère les préoccupations de millions de gens, dur ma vie de star.",
                    paragraphe2: ""
                }
            };
            var params = {
                css: 'videoPage1.css'
            };
            res.render('/videoActivity', {
                video: video,
                params: params
            });
        })
// about page 
        .get('/test', function (req, res) {
            console.log('test');
            youtube.searchVideos();
            var params = {
                css: 'videoPage1.css'
            };
            res.render('pages/test.ejs', {
                params: params
            });
        });
       
   io.sockets.on('connection', function(socket) {
    socket.emit('message', { content: 'Vous êtes bien connecté !', importance: '1' });
    socket.on('nouveauClient', function() {
           
            console.log("nouveau client");
        })
        .on('connexionIndex', function() {
            socket.emit('identification');
            socket.broadcast.emit('entree');

        })
        .on('message', function(message, noOfSouth) {
           
        })
        .on('move', function(_leftF, _topF, _time, _anim) {
           
        })
        .on('disconnect', function(reason) {
            console.log(reason);

            // clients.splice(i, 1);
            // clientsInfo.splice(i, 1);
        });
    });
    server.listen(8080);