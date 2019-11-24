var ent = require('ent');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var moment = require('moment');
var session = require('cookie-session');
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var http = require('http');
var fs = require('fs');
var myYT = require('@micmac/youtube');
var SearchVideos = myYT.SearchVideos;
var SearchThisVideo = myYT.SearchThisVideo;
var searchVideos = new SearchVideos();
var searchThisVideo = new SearchThisVideo();




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
app.use(session({secret: 'todotopsecret'}));
//console.log(__dirname);
app.use('/public', express.static('public'))
        // index page 
        .get('/', function (req, res) {
            var params = {
                css: 'global.css',
                video: searchVideos
            };
            res.render('pages/index.ejs', {
                params: params
            });
        })
        .get('/video', function (req, res) {
                    searchThisVideo.goToVideoPage(searchVideos.alexVideos[req.query.no].idVideo, 'global.css', res,'pages/videoActivity.ejs');               
                        
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
io.sockets.on('connection', function (socket) {
    socket.emit('message', {content: 'Vous êtes bien connecté !', importance: '1'});
    socket.on('nouveauClient', function () {

        console.log("nouveau client");
    })
            .on('connexionIndex', function () {
                socket.emit('identification');
                socket.broadcast.emit('entree');
            })
            .on('message', function (message, noOfSouth) {

            })
            .on('move', function (_leftF, _topF, _time, _anim) {

            })
            .on('disconnect', function (reason) {
                console.log(reason);
                // clients.splice(i, 1);
                // clientsInfo.splice(i, 1);
            });
});
server.listen(8080);