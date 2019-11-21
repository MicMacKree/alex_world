window.onload = function () {
    wBgd = 1920;
    hBgd = 1080;
    hScreen = window.innerHeight;
    wScreen = window.innerWidth;
    document.body.style.height= hScreen + 'px';
    document.body.style.width= wScreen + 'px';
    $('.news').toggleClass('newsStart');
    
        
     
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


