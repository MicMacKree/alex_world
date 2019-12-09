 var socket = io.connect ('http://localhost:8080');
 var infoServer = document.getElementById ('infoServer');
 var chatHTML = document.getElementById ('chat');
 var chatLoginHTML = document.getElementById ('chatLogin');
 socket.on ('message', function (message) {
     infoServer.innerHTML = message.content;
     setTimeout (function () {
         infoServer.innerHTML = '';
     }, 5000);
 })
         .on ('smdySpeak', function (smdySpeak) {
             console.log (smdySpeak);
             infoServer.innerHTML = smdySpeak.slice (- 1)[0].message;
             setTimeout (function () {
                 infoServer.innerHTML = '';
             }, 5000);
         })
         .on ('identification', function (smdySpeak) {
             console.log (smdySpeak);
             infoServer.innerHTML = 'identification';
             chatLoginHTML.style.display = 'none';
             chatHTML.style.display ='flex';
             setTimeout (function () {
                 infoServer.innerHTML = '';
             }, 5000);
         });
 var chatButton = document.getElementById ('chatButton');
 var chatLoginButton = document.getElementById ('chatLoginButton');
 var chatInput = document.getElementById ('chatInput');
 var chatLoginPseudo = document.getElementById ('chatLoginPseudo');
 chatButton.onclick = function () {
     let message = chatInput.value;
     socket.emit ('message', message);
 };
 chatLoginButton.onclick = function () {
     let pseudo = chatLoginPseudo.value;
     socket.emit ('entree', pseudo);
 };
var chatHandlers = document.querySelectorAll ('.chatHandler');
chatHandlers.forEach(function(chatHandler){
    chatHandler.onclick = function () {
      alert('you have click chatHandle !');  
    };
});
