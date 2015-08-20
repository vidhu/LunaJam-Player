namespace LunaJam.Notes {

	export class NotePress extends Phaser.Sprite {
		noteType: NoteType;
        colliderActive: Boolean = false;

        constructor(game: Phaser.Game, noteType: Notes.NoteType, group?: Phaser.Group) {
			super(game, 0, 300);
			switch (noteType) {
				case NoteType.Note_1:
					this.loadTexture("img_note_pressed", 0);
					this.x = 369;
					break;
				case NoteType.Note_2:
					this.loadTexture("img_note_pressed", 1);
					this.x = 409;
					break;
				case NoteType.Note_3:
					this.loadTexture("img_note_pressed", 2);
					this.x = 449;
					break;
				case NoteType.Note_4:
					this.loadTexture("img_note_pressed", 3);
					this.x = 489;
					break;
				case NoteType.Note_5:
					this.loadTexture("img_note_pressed", 4);
					this.x = 529;
					break;
			}
            this.noteType = noteType;

            //Set physics properties
            game.physics.arcade.enable(this);

            //Set anchor
            this.anchor.set(0.5, 0.5);

            //Kill coz yolo
            this.kill();

            //Add to game
            if (group) {
                group.add(this);
            } else {
                this.game.add.existing(this);
            }
		}

        update() {
                    
		}

		press() {
            if (!this.alive) {
                this.revive();
                this.colliderActive = true;
            }
		}

		release() {
            if (this.alive) {
                this.kill();
                this.colliderActive = false;
            }
        }

        onNoteHit(note: Note) {

        }
	}
}