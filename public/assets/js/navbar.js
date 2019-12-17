 var beerus = document.getElementById ('beerus');
 var intervalID;
 beerus.addEventListener ('mouseover', function () {
     var xPos = 0;
     var dx = - 100;
     intervalID = setInterval (function () {
         beerus.style.backgroundPosition = xPos + "px 0px";
         xPos += dx;
         if (xPos <= - 500)
             {
                 dx = 100;
             }
         if (xPos >= 0)
             {
                 dx = - 100;
             }
     }, 50);
 });
 beerus.addEventListener ('mouseleave', function () {
     beerus.style.backgroundPosition = "0px 0px";
     clearInterval (intervalID);
 });
 beerus.addEventListener ('click', function () {
     clearInterval (intervalID);
     redirection ();
 });
 function redirection () {
     document.location.href = '/?pseudo=' + myParam.pseudo + '&color=' + myParam.chatOptions.color + '&style=' + myParam.chatOptions.style +
             '&idSocket=' + myParam.socket.id;
 }
 ;
 