module LunaJam {

	export class Preloader extends Phaser.State {

		loadingBar: Phaser.Sprite;

        preload() {
            var assetRoot = (<LunaJam.Game>this.game).assetRoot;
            var song = (<LunaJam.Game>this.game).song;

			//Loading Bar
			this.add.sprite(this.world.centerX, this.world.centerY, "loading_bg").anchor.set(0.5, 0.5);
			this.loadingBar = this.add.sprite(this.world.centerX, this.world.centerY, "loading_bar");
			this.loadingBar.anchor.set(0.5, 0.5);
			this.loadingBar.position.set(this.loadingBar.position.x - (this.loadingBar.width / 2), this.loadingBar.position.y - (this.loadingBar.height / 2));
			this.loadingBar.anchor.set(0, 0);
			this.load.setPreloadSprite(this.loadingBar);
			

			//Actual game assets
            this.load.script('filterX', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurX.js');
            this.load.script('filterY', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurY.js');

            this.load.image("logo", assetRoot + "/Sprites/logo.png");
            this.load.image("img_background", assetRoot + "/Sprites/background.jpg", true);
            this.load.image("img_stage", assetRoot + "/Sprites/stage.jpg", true);
            this.load.image("img_note1", assetRoot + "/Sprites/Notes/note1.png", true);
            this.load.image("img_note2", assetRoot + "/Sprites/Notes/note2.png", true);
            this.load.image("img_note3", assetRoot + "/Sprites/Notes/note3.png", true);
            this.load.image("img_note4", assetRoot + "/Sprites/Notes/note4.png", true);
            this.load.image("img_note5", assetRoot + "/Sprites/Notes/note5.png", true);
            this.load.image("img_playbtn", assetRoot + "/Sprites/Menu/btn_play.png", true);


            this.load.spritesheet("img_note_pressed", assetRoot + "/Sprites/Notes/note_pressed.png", 44, 44, 5);
            this.load.spritesheet("img_modes", assetRoot + "/Sprites/Menu/modes.png", 204, 318, 4, 2);
            this.load.spritesheet("img_levels", assetRoot + "/Sprites/Menu/levels.png", 202, 81, 4);
            

            this.load.audio("song_file", [song.track], true);

            this.load.binary("midi_file", song.mid, (key, data) => {
				return data; 
            });

            
		}

		create() {
			this.startMainMenu();
		}

        startMainMenu() {
            //var hold: Phaser.Graphics = this.game.make.graphics(0, 0);
            //hold.beginFill(0xffe00c);
            //hold.lineStyle(2, 0xffe00c, 1);
            //hold.drawRoundedRect(0, 0, 5, 100, 2);
            
            //this.sp = new Phaser.Sprite(this.game, 200, 200);
            //this.sp.anchor.set(0.5, 1);
            //this.sp.loadTexture(hold.generateTexture());
            //this.sp.crop(new Phaser.Rectangle(0, 0, hold.width, hold.height), false);

            //this.game.add.existing(this.sp);

            this.game.state.start('MainMenu', true, false);
        }

        sp: Phaser.Sprite;

        update() {
            this.sp.cropRect.height -= this.time.elapsedMS/100;
            this.sp.updateCrop();
        }
	}
}