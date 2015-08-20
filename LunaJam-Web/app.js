var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LunaJam;
(function (LunaJam) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);
            this.state.add('Boot', LunaJam.Boot, false);
            //this.state.add('Preloader', Preloader, false);
            //this.state.add('MainMenu', MainMenu, false);
            //this.state.add('Level1', Level1, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    LunaJam.Game = Game;
})(LunaJam || (LunaJam = {}));
window.onload = function () {
    var game = new LunaJam.Game();
};
//# sourceMappingURL=app.js.map