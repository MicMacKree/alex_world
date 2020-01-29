 function chatClient () {
     // déclaration des variables du chat
     console.log ('entree chatClient()');
     var infoServer = document.getElementById ('infoServer');
     var chatListClient = document.getElementById ('chatConnected');
     var chatHTML = document.getElementById ('chat');
     var chatOutput = document.getElementById ('chatOutput');
     var chatButton = document.getElementById ('chatButton');
     var chatLoginButton = document.getElementById ('chatLoginButton');
     var chatInput = document.getElementById ('chatInput');
     var chatLoginPseudo = document.getElementById ('chatLoginPseudo');
     var chatHandler = document.getElementById ('chatHandler');
     var chatHandlerLogin = document.getElementById ('chatHandlerLogin');
     var chatBody = document.getElementById ('chatBodyUp');
     var reduceChat = document.getElementById ('reduceChat');
     var leaveChat = document.getElementById ('leaveChat');
     var pPseudo = new Array ();
     var pMessage = new Array ();
     var chatList = new Array ();
     var chatMessage = new Array ();

// affectation des événements DOM (bouton valid pseudo, bouton valid message, bar menu des fenêtres

     chatButton.onclick = function () {
         let message = chatInput.value;
         chatInput.value = '';
         socket.emit ('message', message);
     };
     
     chatLoginButton.onclick = function () {
         myParam.pseudo = chatLoginPseudo.value;
         socket.emit ('entry', myParam.pseudo);
     };
     reduceChat.onclick = function () {
        chatBody.classList.toggle('chatReduce');
        chatHTML.classList.toggle('chatMinimize');
    };
     leaveChat.onclick = function () {
        chatHTML.classList.remove('chatActif');
                 setTimeout (function () {
                     chatHTML.style.display = 'none';
                 }, 20);
             socket.disconnect();
    };

     document.body.addEventListener ('mousemove', function (e) {
         if (chatHandler.down)
             {
                 chatHTML.style.left = chatHandler.chatX0 + e.clientX - chatHandler.x0 + 'px';
                 chatHTML.style.top = chatHandler.chatY0 + e.clientY - chatHandler.y0 + 'px';
                 chatLoginHTML.style.left = chatHandler.chatX0 + e.clientX - chatHandler.x0 + 'px';
                 chatLoginHTML.style.top = chatHandler.chatY0 + e.clientY - chatHandler.y0 + 'px';
             }
     });
     document.body.addEventListener ('mouseup', function (e) {
         if (chatHandler.down)
             {
                 chatHandler.down = false;
                 chatHTML.style.left = chatHandler.chatX0 + e.clientX - chatHandler.x0 + 'px';
                 chatHTML.style.top = chatHandler.chatY0 + e.clientY - chatHandler.y0 + 'px';
                 chatLoginHTML.style.left = chatHandler.chatX0 + e.clientX - chatHandler.x0 + 'px';
                 chatLoginHTML.style.top = chatHandler.chatY0 + e.clientY - chatHandler.y0 + 'px';
             }

     });
     chatHandler.addEventListener ('mousedown', function (e) {
         //alert ('largeur : ' + this.offsetWidth);
         this.x0 = e.clientX;
         this.y0 = e.clientY;
         this.chatX0 = chatHTML.offsetLeft;
         this.chatY0 = chatHTML.offsetTop;
         document.body.style.cursor = 'grab';
         this.down = true;
     });
     chatHandlerLogin.addEventListener ('mousedown', function (e) {
         //alert ('largeur : ' + this.offsetWidth);
         chatHandler.x0 = e.clientX;
         chatHandler.y0 = e.clientY;
         chatHandler.chatX0 = chatLoginHTML.offsetLeft;
         chatHandler.chatY0 = chatLoginHTML.offsetTop;
         document.body.style.cursor = 'grab';
         chatHandler.down = true;
     });

// fonction pour écrire les messages serveurs dans le bandeau

     function recieveInfoServer (_messageServer) {
         infoServer.innerHTML = _messageServer;
         setTimeout (function () {
             infoServer.innerHTML = '';
         }, 10000);
     }
     ;


// gestion des messages envoyés depuis le serveur.
     // test si déja connecté
     if (typeof myParam.pseudo === 'undefined' || myParam.pseudo === '')
         {
             console.log ('tchat off');
         }
     else
         {
             socket.emit ('entry', myParam.pseudo);
         }
     ;
     socket.on ('messageServer', function (message) {
         recieveInfoServer (message.text);
     })
             .on ('validEntry', function (_pseudo) {
                 chatList.push (_pseudo);
                 pPseudo.push (document.createElement ('p'));
                 pPseudo.slice (- 1)[0].innerHTML = _pseudo;
                 chatListClient.appendChild (pPseudo.slice (- 1)[0]);
                 recieveInfoServer (_pseudo + ' est entré(e) dans le chat.');
                 console.log ('validEntry');
             })
             .on ('identification', function (data) {
                 chatListClient.innerHTML = "";
                 chatList = new Array ();
                 data.forEach (function (_client) {
                     console.log (_client.pseudo);
                     chatList.push (_client.pseudo);
                     pPseudo.push (document.createElement ('p'));
                     pPseudo.slice (- 1)[0].innerHTML = _client.pseudo;
                     chatListClient.appendChild (pPseudo.slice (- 1)[0]);
                 });
                 myParam.pseudo = data.slice (- 1)[0].pseudo;
                 myParam.socket.id = data.slice (- 1)[0].socketId;
                 console.log ('reception IDENTIFIACATION data : ');
                 console.log (myParam);

                 chatLoginHTML.style.display = 'none';
                 chatHTML.style.display = 'flex';
                 setTimeout (function () {
                     chatLoginHTML.classList.remove ('chatActif');
                     chatHTML.classList.add ('chatActif');
                 }, 20);
                 recieveInfoServer ('Bienvenue ' + myParam.pseudo);
             })
             .on ('leave', function (data) {
                 chatList = new Array ();
                 chatListClient.innerHTML = "";
                 data.forEach (function (_client) {
                     chatList.push (_client.pseudo);
                     pPseudo.push (document.createElement ('p'));
                     pPseudo.slice (- 1)[0].innerHTML = _client.pseudo;
                     chatListClient.appendChild (pPseudo.slice (- 1)[0]);
                 });
             })
             .on ('message', function (_message, _pseudo) {
                 chatMessage.push ({
                     message: _message.text,
                     pseudo: _pseudo,
                     color: _message.color
                 });
                 pMessage.push (document.createElement ('DIV'));
                 pMessage.slice (- 1)[0].innerHTML = '<p class="messagePseudo">' + _pseudo + '</p><p class="messageText">' + _message.text + '</p>';
                 chatOutput.prepend (pMessage.slice (- 1)[0]);
             });
 }

 function readFile (file) {
     var rawFile = new XMLHttpRequest ();
     rawFile.open ("GET", file, false);
     rawFile.onreadystatechange = function () {
         if (rawFile.readyState === 4)
             {
                 if (rawFile.status === 200 || rawFile.status === 0)
                     {
                         var allText = rawFile.responseText;
                         var value = JSON.stringify;
                         console.log (value);
                     }
             }
     };
     rawFile.send (null);
 }