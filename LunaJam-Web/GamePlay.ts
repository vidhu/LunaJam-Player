module LunaJam {

	export class GamePlay extends Phaser.State {


		static targets: Phaser.Rectangle[] = [
			new Phaser.Rectangle(360, 282, 20, 35),
			new Phaser.Rectangle(400, 282, 20, 35),
			new Phaser.Rectangle(440, 282, 20, 35),
			new Phaser.Rectangle(480, 282, 20, 35),
			new Phaser.Rectangle(520, 282, 20, 35)
        ];
        static keyPress: { [note: number]: Notes.NotePress } = {};

        //UI Controls
        btn_start:          Phaser.Button;

        //Public
		midi:               MIDIFile;
		noteSequencer:      Notes.NoteSequencer;
		music:              Phaser.Sound;
        scoreBoard:         ScoreBoard;

        //Private
        _songTime:          number = 0;
        _delay:             number;
        _playbackStarted:   Boolean = false;
        _startGame:         boolean = false;
        _ntIndx:            number = 96;


        init(level: Settings.Difficulty) {
            switch (level) {
                case Settings.Difficulty.EASY:
                    this._delay = Notes.NoteSequencer.NOTE_DELAY_1;
                    this._ntIndx = 60;
                    break
                case Settings.Difficulty.NORMAL:
                    this._delay = Notes.NoteSequencer.NOTE_DELAY_2;
                    this._ntIndx = 72;
                    break;
                case Settings.Difficulty.HARD:
                    this._delay = Notes.NoteSequencer.NOTE_DELAY_3;
                    this._ntIndx = 84;
                    break;
                case Settings.Difficulty.INSANE:
                    this._delay = Notes.NoteSequencer.NOTE_DELAY_4;
                    this._ntIndx = 96;
                    break;
            }
        }

        preload() {
			var buffer = this.game.cache.getBinary("midi_file");
			this.midi = new MIDIFile(buffer);
            this.noteSequencer = new Notes.NoteSequencer(this.midi.getMidiEvents(), this._delay, 0);
            this.music = this.game.add.audio("song_file");
            this.music.onStop.add(() => {
                this.game.state.start('PostGame', true, false, this.scoreBoard);
            });
		}

        create() {
            var root: MasterGroup = new MasterGroup(this.game);
            this.game.add.existing(root);

			//Load Background
            this.add.sprite(this.world.centerX, 0, "img_background", null, root.bg).anchor.set(0.5, 0);
            this.add.sprite(this.world.centerX, 0, "img_stage", null, root.bg).anchor.set(0.5, 0);

            //Load UI
            this.btn_start = new Phaser.Button(this.game, this.world.centerX, this.world.centerY, "img_playbtn", () => {
                this.btn_start.destroy();
                this._startGame = true;
            }, this, 1, 1, 1);
            this.btn_start.anchor.set(0.5, 0.5);
            root.ui.add(this.btn_start);

            //Scoreboard
            this.scoreBoard = new ScoreBoard(this.game);
            root.ui.add(this.scoreBoard);

			//Load Key Press controls
            GamePlay.keyPress[0] = new Notes.NotePress(this.game, Notes.NoteType.Note_1, root.notePress);
            GamePlay.keyPress[1] = new Notes.NotePress(this.game, Notes.NoteType.Note_2, root.notePress);
            GamePlay.keyPress[2] = new Notes.NotePress(this.game, Notes.NoteType.Note_3, root.notePress);
            GamePlay.keyPress[3] = new Notes.NotePress(this.game, Notes.NoteType.Note_4, root.notePress);
            GamePlay.keyPress[4] = new Notes.NotePress(this.game, Notes.NoteType.Note_5, root.notePress);
            
            //Load Sprites
            this.noteSequencer.createSprites(this, root.notes);
		}

        update() {
            if (this._startGame) {
                this.addNote();
                this.processInput();
            }
		}

		addNote(): void {
            if (this._songTime < this._delay) {
                this._songTime += this.time.physicsElapsedMS;;
            } else {
                if (!this._playbackStarted) {
                    this.music.play();
                    this._playbackStarted = true;
                }
                this._songTime = this.music.currentTime + this._delay;
            }

            var note1: Notes.MIDINote = (this.noteSequencer.notes.containsKey(this._ntIndx) && this.noteSequencer.notes.getValue(this._ntIndx).size() > 0) ? this.noteSequencer.notes.getValue(this._ntIndx).peek() : null;
            var note2: Notes.MIDINote = (this.noteSequencer.notes.containsKey(this._ntIndx+1) && this.noteSequencer.notes.getValue(this._ntIndx+1).size() > 0) ? this.noteSequencer.notes.getValue(this._ntIndx+1).peek() : null;
            var note3: Notes.MIDINote = (this.noteSequencer.notes.containsKey(this._ntIndx+2) && this.noteSequencer.notes.getValue(this._ntIndx+2).size() > 0) ? this.noteSequencer.notes.getValue(this._ntIndx+2).peek() : null;
            var note4: Notes.MIDINote = (this.noteSequencer.notes.containsKey(this._ntIndx+3) && this.noteSequencer.notes.getValue(this._ntIndx+3).size() > 0) ? this.noteSequencer.notes.getValue(this._ntIndx+3).peek() : null;
            var note5: Notes.MIDINote = (this.noteSequencer.notes.containsKey(this._ntIndx+4) && this.noteSequencer.notes.getValue(this._ntIndx+4).size() > 0) ? this.noteSequencer.notes.getValue(this._ntIndx+4).peek() : null;

            if (note1 != null && note1.occursAt < this._songTime) {
                this.noteSequencer.notes.getValue(this._ntIndx).dequeue().sprite.spawn();
            }
            if (note2 != null && note2.occursAt < this._songTime) {
                this.noteSequencer.notes.getValue(this._ntIndx + 1).dequeue().sprite.spawn();
            }
            if (note3 != null && note3.occursAt < this._songTime) {
                this.noteSequencer.notes.getValue(this._ntIndx + 2).dequeue().sprite.spawn();
            }
            if (note4 != null && note4.occursAt < this._songTime) {
                this.noteSequencer.notes.getValue(this._ntIndx + 3).dequeue().sprite.spawn();
            }            
            if (note5 != null && note5.occursAt < this._songTime) {
                this.noteSequencer.notes.getValue(this._ntIndx + 4).dequeue().sprite.spawn();
            }
		}

		processInput() {
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.ONE)){
                GamePlay.keyPress[0].press();
			} else {
                GamePlay.keyPress[0].release();
			}

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.TWO)) {
                GamePlay.keyPress[1].press();
			} else {
                GamePlay.keyPress[1].release();
			}

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.THREE)) {
                GamePlay.keyPress[2].press();
			} else {
                GamePlay.keyPress[2].release();
			}

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.FOUR)) {
                GamePlay.keyPress[3].press();
			} else {
                GamePlay.keyPress[3].release();
			}

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.FIVE)) {
                GamePlay.keyPress[4].press();
			} else {
                GamePlay.keyPress[4].release();
			}
        }

        render() {
            //this.loadDebugInfo();
            //this.game.debug.text(this.game.time.fps.toString(), this.world.width - 24, 14, "#00ff00");
        }

		loadDebugInfo() {
			this.game.debug.inputInfo(32, 32);
			this.game.debug.rectangle(GamePlay.targets[0], '#00ff00', false);
			this.game.debug.rectangle(GamePlay.targets[1], '#00ff00', false);
			this.game.debug.rectangle(GamePlay.targets[2], '#00ff00', false);
			this.game.debug.rectangle(GamePlay.targets[3], '#00ff00', false);
			this.game.debug.rectangle(GamePlay.targets[4], '#00ff00', false);
		}

        addNoteDebug(): void {
            this._songTime += this.time.physicsElapsedMS;
            if (this._songTime > 1000) {
                new Notes.Note(this, this.world, Notes.NoteType.Note_1, 1800).spawn();
                new Notes.Note(this, this.world, Notes.NoteType.Note_2, 1600).spawn();
                new Notes.Note(this, this.world, Notes.NoteType.Note_3, 1400).spawn();
                new Notes.Note(this, this.world, Notes.NoteType.Note_4, 1200).spawn();
                new Notes.Note(this, this.world, Notes.NoteType.Note_5, 1000).spawn();
                this._songTime = 0;
            }
        }
	}
}