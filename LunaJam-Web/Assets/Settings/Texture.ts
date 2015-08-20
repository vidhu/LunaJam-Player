module LunaJam.Settings {

    export class Texture {

        private static noteTexture: string[][] = [
            ["img_note1", "path"],
            ["img_note2", "path"],
            ["img_note3", "path"],
            ["img_note4", "path"],
            ["img_note5", "path"],
        ];

        static getNoteTexture(noteType: Notes.NoteType): string {
            switch (noteType) {
                case Notes.NoteType.Note_1:
                    return this.noteTexture[0][0];
                    break;
                case Notes.NoteType.Note_2:
                    return this.noteTexture[1][0];
                    break;
                case Notes.NoteType.Note_3:
                    return this.noteTexture[2][0];
                    break;
                case Notes.NoteType.Note_4:
                    return this.noteTexture[3][0];
                    break;
                case Notes.NoteType.Note_5:
                    return this.noteTexture[4][0];
                    break;
            }
        }
    }
}