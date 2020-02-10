     window.onload = function () {
     var hScreen = window.innerHeight;
     var wScreen = window.innerWidth;
     document.body.style.height = hScreen + 'px';
     document.body.style.width = wScreen + 'px';
     $ ('.news').toggleClass ('newsStart');
    //  allVideos = JSON.parse(allVideos);
     console.log (allVideos);
     var videoCard = new Object ();
     var masterCard_0 = document.getElementById ('masterCard_0');
     var masterCard_1 = document.getElementById ('masterCard_1');
     var masterCard_2 = document.getElementById ('masterCard_2');
     var masterCard_3 = document.getElementById ('masterCard_3');
     for (let i = 0;
             i < 10;
             i ++)
         {
             videoCard[i] = document.createElement ("A");
             videoCard[i].innerHTML = '<div class="card-body">'
                     + '                  <h5 class="titleCard">' + allVideos[i].title + '</h5>'
                     + '              </div>'
                     + '              <p class="description">' + allVideos[i].description2 + ' ... ' + '</p>'
                     + '              <div class="container row p-0 m-0">'
                     + '                  <img id="thumbnail_' + i + '" class="lazyload thumbnail p-0 m-0" data-src="' + allVideos[i].thumbnail + '" alt="' + allVideos[i].title + '">'
                     + '                  <p class="card-text text2 col-md-6 pt-2"></p>'
                     + '              </div>'
                     + '              <div class="card-footer p-0 m-0 mt-1 mb-1 w-100">'
                     + '                  <small>Posté le ' + allVideos[i].date + '</small>'
                     + '              </div>';
             videoCard[i].setAttribute ("href", "#");
             videoCard[i].setAttribute ("id", "video" + i);
             videoCard[i].classList.add ("card");
             videoCard[i].addEventListener ('click', function () {
                 redirection (i);
             });
         }
     ;
     masterCard_0.appendChild (videoCard[0]);
     masterCard_0.appendChild (videoCard[1]);
     masterCard_0.appendChild (videoCard[2]);

     masterCard_1.appendChild (videoCard[3]);
     masterCard_1.appendChild (videoCard[4]);
     masterCard_1.appendChild (videoCard[5]);
     
     masterCard_2.appendChild (videoCard[6]);
     masterCard_2.appendChild (videoCard[7]);
     masterCard_2.appendChild (videoCard[8]);
     
     masterCard_3.appendChild (videoCard[9]);
             };
  function redirection (_i) {
     document.location.href = '/video?noVideo=' + _i + '&pseudo=' + myParam.pseudo + '&color=' + myParam.chatOptions.color + '&style=' + myParam.chatOptions.style +
             '&idSocket=' + myParam.socket.id;
 }
