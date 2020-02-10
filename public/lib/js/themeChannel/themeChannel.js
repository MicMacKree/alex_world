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
                         html: '<div class="fortnite" id="backTheme">'
                                 + '     <div id="subBackTheme" class="TV">'
                                 + '         <div id="player" class="fortnitePlayer">'
                                 + '         </div>'
                                 + '     </div>'
                                 + '</div>'
                         ,
                         background: 'fortnite.jpg'
                     };
             this.themeContent['other'] =
                     {
                         html: '<div class="other" id="backTheme">'
                             + '         <div id="player" class="otherPlayer">'
                             + '         </div>'
                                 + '</div>'
                         ,
                         background: 'other.jpg'
                     };
             this.themeContent['simcity'] =
                     {
                         html: '<div class="simcity" id="backTheme">'
                                 + '         <div id="player" class="simcityPlayer">'
                                 + '         </div>'
                                 + '</div>'
                         ,
                         background: 'simcity.jpg'
                     };
             this.themeContent['nature'] =
                     {
                         html: '<div class="nature" id="backTheme">'
                                 + '         <div id="player" class="naturePlayer">'
                                 + '         </div>'
                                 + '</div>'
                         ,
                         background: 'nature.jpg'
                     };
             this.themeContent['gravitrax'] =
                     {
                         html: '<div id="backTheme" class="gravitrax">'
                             + '    <div class="panda" id="subBackTheme">'
                             + '         <div id="player" class="gravitraxPlayer">'
                             + '         </div>'
                             + '    </div>'
                             + '</div>'
                         ,
                         background: 'gravitrax3.gif'
                     };
         },
         setThemeHTML: function () {
             this.DIV.innerHTML = this.themeContent[this.theme].html;
             this.DIV.setAttribute ("id", "theme");
             this.DIV.classList.add ("container-fluid", "p-0", "m-0");
             this.parentDIV.prepend (this.DIV);
             this.parentDIV.addEventListener ('click', function () {
                 this.subBackTheme = document.getElementById ("subBackTheme");
             }.bind (this));
         }
     };
