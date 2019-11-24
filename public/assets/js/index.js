window.onload = function () {
    wBgd = 1920;
    hBgd = 1080;
    hScreen = window.innerHeight;
    wScreen = window.innerWidth;
    document.body.style.height = hScreen + 'px';
    document.body.style.width = wScreen + 'px';
    $('.news').toggleClass('newsStart');
    var allVideos = JSON.parse($('#hidden').text());
    console.log(JSON.stringify(allVideos));
    var videoCard = new Object();
    var newNode = new Object();
    var masterCard = document.getElementById('masterCard');
    for (let i = 0; i < 3; i++) {
        videoCard[i] = document.createElement("A");
        videoCard[i].innerHTML = '<div class="card-body pb-0">'
                + '                  <h5 class="card-title">' + allVideos.alexVideos[i].title + '</h5>'
                + '                  <p class="card-text">' + allVideos.alexVideos[i].description + '</p>'
                + '              </div>'
                + '              <div class="container row">'
                + '                  <img id="thumbnail_' + i + '" class="card-img-top col-md-6" src="' + allVideos.alexVideos[i].urlThumbnails + '" alt="' + allVideos.alexVideos[i].title + '">'
                + '                  <p class="card-text text2 col-md-6 pt-2">' + allVideos.alexVideos[i].description2 + '</p>'
                + '              </div>'
                + '              <div class="card-footer">'
                + '                  <small>Posté le ' + allVideos.alexVideos[i].date + '</small>'
                + '              </div>';
        videoCard[i].setAttribute("href", "/video?no=" + i);
        videoCard[i].classList.add("card");
        masterCard.appendChild(videoCard[i]);
    }
    ;
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
};


