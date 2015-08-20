module LunaJam {

	export class Boot extends Phaser.State{
		
		preload(): void {
			this.load.image("loading_bg", "Assets/Sprites/Loading/loading_bg.png");
            this.load.image("loading_bar", "Assets/Sprites/Loading/loading_bar.png");

            //Load physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
		}

		create(): void {
			//For non multi touch input
			this.input.maxPointers = 1;

			//Pause game when focus is lost
			this.stage.disableVisibilityChange = true;

			//Device Settings
			if (this.game.device.desktop) {
				this.game.scale.pageAlignHorizontally = true;
			}

			this.game.state.start("Preloader", true, false);
		}
	}
}