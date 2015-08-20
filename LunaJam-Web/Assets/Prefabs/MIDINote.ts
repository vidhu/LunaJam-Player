module LunaJam.Notes {

	export class MIDINote {
		occursAt: number;
		key: number;
        endsAt: number;
        sprite: Note;

        constructor(key: number, occursAt: number, endsAt?: number) {
            this.occursAt = occursAt;
            this.endsAt = endsAt || occursAt;
            this.key = key;
        }

        createSprite(context: GamePlay, delay: number, group?: Phaser.Group): void {
            switch (this.key % 12) {
                case 0:
                    this.sprite = new Note(context, group, NoteType.Note_1, delay, this.getDuration());
                    break;
                case 1:
                    this.sprite = new Note(context, group, NoteType.Note_2, delay, this.getDuration());
                    break;
                case 2:
                    this.sprite = new Note(context, group, NoteType.Note_3, delay, this.getDuration());
                    break;
                case 3:
                    this.sprite = new Note(context, group, NoteType.Note_4, delay, this.getDuration());
                    break;
                case 4:
                    this.sprite = new Note(context, group, NoteType.Note_5, delay, this.getDuration());
                    break;
            }
        }

		getDuration(): number {
			return this.endsAt - this.occursAt;
		}
	}
}