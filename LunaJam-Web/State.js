var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LunaJam;
(function (LunaJam) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image("logo", "Assets/Sprites/logo.png");
        };
        Boot.prototype.create = function () {
            //For non multi touch input
            this.input.maxPointers = 1;
            //Pause game when focus is lost
            this.stage.disableVisibilityChange = true;
            //Device Settings
            if (this.game.device.desktop) {
                this.game.scale.pageAlignHorizontally = true;
            }
            this.game.state.start("PreLoader", true, false);
        };
        return Boot;
    })(Phaser.State);
    LunaJam.Boot = Boot;
})(LunaJam || (LunaJam = {}));
//# sourceMappingURL=State.js.map