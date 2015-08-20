module LunaJam {

	export class MainMenu extends Phaser.State {

        btn_mode1: Phaser.Button;
        btn_mode2: Phaser.Button;
        btn_level: { [level: number]: Phaser.Button } = {};

        create() {
            //Load Background
            this.add.sprite(this.world.centerX, 0, "img_background").anchor.set(0.5, 0);
            this.btn_mode1 = this.add.button(this.world.centerX - 215, 10, "img_modes", this.btn_mode1_onClick, this, 2, 0)
            this.btn_mode2 = this.add.button(this.world.centerX + 7, 10, "img_modes", this.btn_mode1_onClick, this, 3, 1);
            
            //Decode song
            //this.game.sound.setDecodedCallback(["song_file"], this.startGame, this);
		}

		startGame(level: number) {
            this.game.state.start('GamePlay', true, false, level);
            //this.game.state.start('PostGame');
        }

        btn_mode1_onClick(): void {
            this.game.add.tween(this.btn_mode1).to({ x: this.btn_mode1.x - 50 }, 1000, Phaser.Easing.Exponential.Out).start().onComplete.add(() => {

            }, this);
            this.game.add.tween(this.btn_mode2).to({ alpha: 0 }, 500, Phaser.Easing.Exponential.Out).start().onComplete.add(() => {
                this.btn_mode2.destroy();
                
                for (var i = 0; i < 4; i++) {
                    this.btn_level[i] = new Phaser.Button(this.game, this.world.centerX + 67, (i) * 79 + 10, "img_levels", this.btn_level_onClick, this, i, i);
                    this.btn_level[i].anchor.set(0.5, 0);
                    this.btn_level[i].alpha = 0;
                    this.game.add.existing(this.btn_level[i]);
                    this.game.add.tween(this.btn_level[i]).to({ alpha: 1 }, 250, Phaser.Easing.Exponential.In, true, i*100);
                }
            }, this);
        }

        btn_level_onClick(btn: Phaser.Button): void {
            switch (btn) {
                case this.btn_level[0]:
                    this.startGame(Settings.Difficulty.EASY);
                    break;
                case this.btn_level[1]:
                    this.startGame(Settings.Difficulty.NORMAL);
                    break;
                case this.btn_level[2]:
                    this.startGame(Settings.Difficulty.HARD);
                    break;
                case this.btn_level[3]:
                    this.startGame(Settings.Difficulty.INSANE);
                    break;
            }
        }
	}
}