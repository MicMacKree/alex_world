 window.onload = function () {
     wBgd = 1920;
     hBgd = 1080;
     hScreen = window.innerHeight;
     wScreen = window.innerWidth;
     document.body.style.height = hScreen + 'px';
     document.body.style.width = wScreen + 'px';
     $ ('.news').toggleClass ('newsStart');
     var allVideos = JSON.parse ($ ('#hidden').text ());
     console.log (JSON.stringify (allVideos));
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
             videoCard[i].innerHTML = '<div class="card-body pb-0">'
                     + '                  <h5 class="card-title">' + allVideos.video[i].title + '</h5>'
                     + '                  <p class="card-text">' + allVideos.video[i].description2+ ' ... ' + '</p>'
                     + '              </div>'
                     + '              <div class="container row">'
                     + '                  <img id="thumbnail_' + i + '" class="card-img-top col-md-6" src="' + allVideos.video[i].thumbnail + '" alt="' + allVideos.video[i].title + '">'
                     + '                  <p class="card-text text2 col-md-6 pt-2"></p>'
                     + '              </div>'
                     + '              <div class="card-footer">'
                     + '                  <small>Posté le ' + allVideos.video[i].date + '</small>'
                     + '              </div>';
             videoCard[i].setAttribute ("href", "/video?no=" + i);
             videoCard[i].classList.add ("card");
         }
     ;
     masterCard_0.appendChild (videoCard[0]);
     masterCard_0.appendChild (videoCard[1]);
     masterCard_0.appendChild (videoCard[2]);
     masterCard_1.prepend (videoCard[3]);
     masterCard_1.appendChild (videoCard[4]);
     masterCard_2.appendChild (videoCard[5]);
     masterCard_2.appendChild (videoCard[6]);
     masterCard_2.appendChild (videoCard[7]);
     masterCard_3.appendChild (videoCard[8]);
     masterCard_3.appendChild (videoCard[9]);
 };


// '<a href="\video?no=' + i + '" class="card">'
//    setTimeout(function(){
//        $('.news').toggleClass('newsStart');
//    },100000);
//    section=document.getElementsByTagName('section');
//    hBgdCalc=hScreen;
//    wBgdCalc=hScreen*wBgd/hBgd;
//    if (hScreen<hBgdCalc) {
//       hBgdCalc=hScreen;
//       wBgdCalc=hScreen*wBgd/hBgd;
//   }
//   if (wScreen<wBgdCalc){
//        wBgdCalc=wScreen;
//        hBgdCalc=wScreen*hBgd/wBgd;
//    }
//    section[0].style.height=hBgdCalc+'px';
//    section[0].style.width=wBgdCalc+'px';
//    portable = document.getElementById('portable');
//    setTimeout(function () { 
//        portable.classList.toggle('zoom');
//    }, 100);



