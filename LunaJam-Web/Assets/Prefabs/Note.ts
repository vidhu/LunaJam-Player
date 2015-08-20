module LunaJam.Notes {

	export class Note extends Phaser.Group {
        gamePlay: GamePlay;
        group: Phaser.Group;

        note: Phaser.Sprite;
        hold: Phaser.Sprite;

        noteType: NoteType;
        delay: number = 1500;
        duration: number = 0;
        speed: number = 0;  //px per ms
        target: NotePress;
        timeAlive: number = 0;
        holdLength: number = 0;
        isMissed: boolean = false;
 

        constructor(gamePlay: GamePlay, group: Phaser.Group, noteType: NoteType, delay: number, duration?: number) {
            super(gamePlay.game, null);
            
            this.gamePlay = gamePlay;
            this.group = group;
            this.noteType = noteType;
            this.delay = delay;
            this.duration = duration - 50 || 0;
            this.y = -20;


            switch (this.noteType) {
                case NoteType.Note_1:
                    this.x = 369;
                    this.target = GamePlay.keyPress[0];
                    break;
                case NoteType.Note_2:
                    this.x = 409;
                    this.target = GamePlay.keyPress[1];
                    break;
                case NoteType.Note_3:
                    this.x = 449;
                    this.target = GamePlay.keyPress[2];
                    break;
                case NoteType.Note_4:
                    this.x = 489;
                    this.target = GamePlay.keyPress[3];
                    break;
                case NoteType.Note_5:
                    this.x = 529;
                    this.target = GamePlay.keyPress[4];
                    break;
            }

            var distance = this.position.distance(new Phaser.Point(this.x, GamePlay.targets[0].centerY - 10));
            this.speed = distance / this.delay;

            this.createHold();
            this.createNote();
		}

        createNote(): void {
            this.note = new Phaser.Sprite(this.game, 0, 0);
            this.note.anchor.set(0.5, 0.5);
            this.note.loadTexture(Settings.Texture.getNoteTexture(this.noteType));
            this.game.physics.arcade.enable(this.note);
            this.note.body.moves = true;

            this.add(this.note);
        }

        createHold(): void {
            if (this.duration < 500)
                return

            this.holdLength = this.duration * this.speed;

            var color = Settings.Colors.getNoteHoldColor(this.noteType);
            var gfx: Phaser.Graphics = this.game.make.graphics(0, 0);
            gfx.beginFill(color);
            gfx.lineStyle(2, color, 1);
            gfx.drawRoundedRect(0, 0, 5, this.holdLength, 2);

            this.hold = new Phaser.Sprite(this.game, 0, 0);
            this.hold.anchor.set(0.5, 1);
            this.hold.loadTexture(gfx.generateTexture());
            this.hold.crop(new Phaser.Rectangle(0, 0, gfx.width, gfx.height), false);

            this.add(this.hold);
        }

        spawn(): void {
			//Show note in game
            if (this.group) {
                this.group.add(this);
            } else {
                this.game.add.existing(this);
            }

			//Move the note at calculated speed
			this.note.body.velocity = new Phaser.Point(0, this.speed * 1000);
		}
		
        update() {
            //Handle Note
            if (this.hold) {
                if (this.note.alive) {
                    this.hold.y = this.note.y + 20;
                } else if (this.hold.cropRect.height > 0 && this.game.input.keyboard.isDown(Settings.Controls.getNoteKey(this.noteType))) {
                    var tmp = (this.holdLength / this.duration) * this.game.time.physicsElapsedMS;
                    this.gamePlay.scoreBoard.addToScore(tmp / 100);
                    this.hold.cropRect.height -= tmp;
                    this.hold.updateCrop();
                } else {
                    this.hold.kill();
                }
            }


            //Check for collisions
            this.checkCollision();

            //Missed
            if (!this.isMissed && this.note.top > this.target.bottom) {
                this.isMissed = true;
                this.gamePlay.scoreBoard.endStreak();
            }


            //Destroy after a while
            this.timeAlive += this.game.time.elapsedMS;
            if (this.timeAlive > this.delay + this.duration + 1000)
                this.destroy();
        }

        checkCollision(): void {
            if (this.note.alive && this.target.alive && this.game.physics.arcade.intersects(this.note.body, this.target.body)) {
                if (this.target.colliderActive) {
                    this.gamePlay.scoreBoard.addToScore(10);
                    this.gamePlay.scoreBoard.addToStreak(1);
                    this.target.colliderActive = false;
                    this.note.kill();
                }
            }
        }
	}
}