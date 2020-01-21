 var beerus = document.getElementById ('beerus');
 var intervalID;
 beerus.addEventListener ('mouseover', function () {
     var xPos = 0;
     var dx = - beerus.offsetWidth;
     var spriteWidth = -dx * 5;
     intervalID = setInterval (function () {
       if (xPos <= - spriteWidth)
             {
                 dx = beerus.offsetWidth;
             }
         if (xPos >= 0)
             {
                 dx = -beerus.offsetWidth;
             }
        beerus.style.backgroundPosition = xPos + "px 0px";
         xPos += dx;
     }, 50);
 });
 beerus.addEventListener ('mouseleave', function () {
     beerus.style.backgroundPosition = "0px 0px";
     clearInterval (intervalID);
 });

 