 Theme = function (_theme) {
     this.initTheme (_theme);
     this.setThemeHTML ();
 };
 Theme.prototype = {
     initTheme: function (_theme) {
         this.theme = _theme;
         this.DIV = document.createElement ("DIV");
         this.parentDIV = document.getElementById ('themeVideo');
         this.themeContent = new Array ();
         this.themeContent['fortnite'] = 
             {
                 html: '<div id="fortnite" style="background-image: url(\'/public/assets/img/theme/fortnite.jpg\')">'
                         + '     <div class="TV">'
                         + '         <iframe id="ytplayer" class="fortniteYtPlayer" type="text/html" width="100%" height="100%"'
                         + '         src="https://www.youtube.com/embed/<%= params.video.id %>?autoplay=1"'
                         + '         frameborder="0" allowfullscreen>'
                         + '         </iframe>'
                         + '     </div>'
                         + '</div>'
             ,
                 background: 'fortnite.jpg'
             }
         ;
         this.themeContent['other'] = 
             {
                 html: '<div id="other" style="background-image: url(\'/public/assets/img/theme/other.jpg\')">'
                         + '         <iframe id="ytplayer" class="otherYtPlayer" type="text/html" width="100%" height="100%"'
                         + '         src="https://www.youtube.com/embed/<%= params.video.id %>?autoplay=1"'
                         + '         frameborder="0" allowfullscreen>'
                         + '         </iframe>'
                         + '</div>'
                 ,
               background: 'other.jpg'
             }
         ;
         this.themeContent['simcity'] = 
             {
                 html: '<div id="simcity" style="background-image: url(\'/public/assets/img/theme/simcity.jpg\')">'
                         + '         <iframe id="ytplayer" class="simcityYtPlayer" type="text/html" width="100%" height="100%"'
                         + '         src="https://www.youtube.com/embed/<%= params.video.id %>?autoplay=1"'
                         + '         frameborder="0" allowfullscreen>'
                         + '         </iframe>'
                         + '         <iframe id="ytplayer" class="simcityYtPlayer2" type="text/html" width="100%" height="100%"'
                         + '         src="https://www.youtube.com/embed/<%= params.video.id %>?autoplay=1"'
                         + '         frameborder="0" allowfullscreen>'
                         + '         </iframe>'
                         + '</div>'
                 ,
               background: 'simcity.jpg'
             }
         ;
         this.themeContent['nature'] = 
             {
                 html: '<div id="nature" style="background-image: url(\'/public/assets/img/theme/nature.jpg\')">'
                         + '         <iframe id="ytplayer" class="natureYtPlayer" type="text/html" width="100%" height="100%"'
                         + '         src="https://www.youtube.com/embed/<%= params.video.id %>?autoplay=1"'
                         + '         frameborder="0" allowfullscreen>'
                         + '         </iframe>'
                         + '</div>'
             ,
                 background: 'nature.jpg'
             }
         ;
     },
     setThemeHTML: function () {
         this.DIV.innerHTML = this.themeContent[this.theme].html;
         this.DIV.setAttribute ("id", "theme");
         this.DIV.classList.add ("container-fluid", "h-100", "w-100", "p-0", "m-0");
         this.parentDIV.prepend (this.DIV);
     }
 };


