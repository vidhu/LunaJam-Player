module LunaJam {

	export class Game extends Phaser.Game {

		constructor(elementId: string) {
            super(900, 369, Phaser.AUTO, elementId, null);
			
            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('GamePlay', GamePlay, false);
            this.state.add('PostGame', PostGame, false);

            this.state.start('Boot');
        }

    }
}