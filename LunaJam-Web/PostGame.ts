module LunaJam {

    export class PostGame extends Phaser.State {

        scoreBoard: ScoreBoard;
        root: MasterGroup;

        init(scoreBoard: ScoreBoard) {
            scoreBoard
            this.scoreBoard = scoreBoard || new ScoreBoard(this.game);
        }

        preload() {
            var resources = [
                'Assets/Sprites/LvlComplete/panel-650x400.png',
                'Assets/Sprites/LvlComplete/lvlcomplete.png',
                'Assets/Sprites/LvlComplete/orange-btn.png'
            ];

            for (var i = 0; i < resources.length; i++) {
                this.game.load.image(resources[i], resources[i]);
            }

            this.game.load.onLoadComplete.add(EZGUI.Compatibility.fixCache, this.game.load, null, resources);
        }

        create() {       
            this.root = this.game.add.existing(new MasterGroup(this.game));

            //Load Background
            this.add.sprite(this.world.centerX, 0, "img_background", null, this.root.bg).anchor.set(0.5, 0);
            this.add.sprite(this.world.centerX, 0, "img_stage", null, this.root.bg).anchor.set(0.5, 0);

            //Add filters
            var blurX = this.game.add.filter('BlurX');
            var blurY = this.game.add.filter('BlurY');
            this.root.bg.filters = [blurX, blurY];

            this.ez();
        }

        ez() {
            var lvlComplete = {
                id: 'lvlComplete',
                component: 'Window',
                image: 'Assets/Sprites/LvlComplete/panel-650x400.png',
                header: { position: { x: 0, y: -40 }, height: 100, image: 'Assets/Sprites/LvlComplete/lvlcomplete.png', },
                position: { x: 0, y: 0 },
                width: 400,
                height: 300,
                layout: [1, 4],
                children: [
                    {
                        id: 'lbl_score',
                        text: 'Score: ' + this.scoreBoard.score,
                        component: 'Label',
                        position: { x: 100, y: -40 },
                        font: {
                            size: '35px',
                            family: 'Skranji',
                            color: 'white'
                        },
                        width: 200,
                        height: 80
                    },
                    {
                        text: 'Streak: ' + this.scoreBoard.streak,
                        component: 'Label',
                        position: { x: 100, y: -40 },
                        font: {
                            size: '35px',
                            family: 'Skranji',
                            color: 'white'
                        },
                        width: 200,
                        height: 80
                    },
                    {
                        id: 'playAgain',
                        text: 'Play Again',
                        component: 'Button',
                        image: 'Assets/Sprites/LvlComplete/orange-btn.png',
                        position: { x: 100, y: 0},
                        font: {
                            size: '30px',
                            family: 'Skranji',
                            color: 'white'
                        },
                        width: 210,
                        height: 60
                    }
                ]
            }

            EZGUI.game = this.game;
            EZGUI.Theme.load(['Assets/Engine/EzGUI/assets/kenney-theme/kenney-theme.json'], () => {
                var finishScreen = EZGUI.create(lvlComplete, 'kenney');
                finishScreen.position.x = (this.world.width - finishScreen.settings.width) / 2;
                finishScreen.position.y = -20 - finishScreen.settings.height;
                var targetY = ((this.world.height - finishScreen.settings.height) / 2) + 20;
                finishScreen.animatePosTo(finishScreen.position.x, targetY, 800, EZGUI.Easing.Back.Out);
            });
        }
    }
}