module LunaJam.Notes {

	export class NoteSequencer {
        static NOTE_DELAY_1: number = 2000;
        static NOTE_DELAY_2: number = 1500;
        static NOTE_DELAY_3: number = 1500;
        static NOTE_DELAY_4: number = 1000;

		notes: collections.Dictionary<number, collections.Queue<MIDINote>> = new collections.Dictionary<number, collections.Queue<MIDINote>>();
        delay: number;

        constructor(events: MIDIEvent[], delay: number, mode: number) {
            this.delay = delay;

            var tmpNotes: collections.Dictionary<number, collections.Stack<MIDINote>> = new collections.Dictionary<number, collections.Stack<MIDINote>>();
            var prevNotes: MIDINote[] = [];
            for (var i in events) {
                var event: MIDIEvent = events[i];
                if (event.subtype == 0x9) {

                    //Create Stack
                    if (!tmpNotes.containsKey(event.param1))
                        tmpNotes.setValue(event.param1, new collections.Stack<MIDINote>());

                    //Current note and Previous note
                    var curNote: MIDINote = new MIDINote(event.param1, event.playTime);
                    var prevNote: MIDINote = NoteSequencer.getPrevNote(prevNotes, curNote.key);
                    
                    //Check to remove parallel notes
                    if (curNote.occursAt == prevNote.occursAt) {
                        if (curNote.key < prevNote.key && !(curNote.key == prevNote.key)) {
                            tmpNotes.getValue(prevNote.key).pop();
                            tmpNotes.getValue(event.param1).push(curNote);
                            prevNotes[NoteSequencer.getLevel(curNote.key)] = curNote;
                        }
                    } else {
                        tmpNotes.getValue(event.param1).push(curNote);
                        prevNotes[NoteSequencer.getLevel(curNote.key)] = curNote;
                    }
                } else if(event.subtype == 0x8){
                    var prevNote: MIDINote = NoteSequencer.getPrevNote(prevNotes, event.param1);
                    prevNote.endsAt = event.playTime;
                }
            }

            tmpNotes.forEach((key: number, value: collections.Stack<MIDINote>) => {
                value.forEach((item: MIDINote) => {
                    if (!this.notes.containsKey(item.key))
                        this.notes.setValue(item.key, new collections.Queue<MIDINote>());
                    this.notes.getValue(item.key).add(item);
                    //console.log(item.occursAt);
                    return true;
                }, true);
            });
        }

        createSprites(context: GamePlay, group?:Phaser.Group): void {
            this.notes.forEach((key: number, value: collections.Queue<MIDINote>) => {
                value.forEach((note: MIDINote) => {
                    note.createSprite(context, this.delay, group);
                    return true;
                });
            });
        }

        static getPrevNote(prevNotes: MIDINote[], key: number): MIDINote {
            var level: Settings.Difficulty = NoteSequencer.getLevel(key);
            if (prevNotes[level] == undefined)
                return new MIDINote(-1, key);
            return prevNotes[level];
        }

        static getLevel(key: number): Settings.Difficulty {
            if (key >= 60 && key <= 64)
                return Settings.Difficulty.EASY;
            else if (key >= 72 && key <= 76)
                return Settings.Difficulty.NORMAL;
            else if (key >= 84 && key <= 88)
                return Settings.Difficulty.HARD;
            else if (key >= 96 && key <= 100)
                return Settings.Difficulty.INSANE;
        }

        /**
        constructor(events: MIDIEvent[], delay: number, mode:number) {
            this.delay = delay;

			for (var i in events) {
				var event: MIDIEvent = events[i];
                if (event.subtype == 0x9) {
					if (!this.notes.containsKey(event.param1))
						this.notes.setValue(event.param1, new collections.Queue<MIDINote>());
                    this.notes.getValue(event.param1).add(new MIDINote(event.playTime, event.param1));
				}
			}
        }
        **/

        /**
        loadNotes(context: Phaser.State) {
            this.notes.forEach((key: number, value: collections.Queue<MIDINote>) => {
                value.forEach((note: MIDINote) => {
                    note.sprite = new Note(context.game, NoteType.Note_1, 2);
                    return true;
                });
            });
        }
        **/

		/**
		constructor(events: MIDIEvent[]) {
			var notes: collections.Dictionary<number, collections.LinkedList<MIDINote>> = new collections.Dictionary<number, collections.LinkedList<MIDINote>>();
			for (var i in events) {
				var event: MIDIEvent = events[i];
				if (event.subtype = 0x9) {
					if (!notes.containsKey(event.param1))
						notes.setValue(event.param1, new collections.LinkedList<MIDINote>());
					notes.getValue(event.param1).add(new MIDINote(event.playTime, NoteType.Note_1));
				} else if (event.subtype = 0x8) {
					notes.getValue(event.param1).last().endsAt = event.playTime;
				}
			}
			
		}
		**/
	}
}