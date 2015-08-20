module LunaJam.Settings {

    export class Colors {
        
        private static noteHoldColors: number[] = [0xffe00c, 0x9823a5, 0x8aff00, 0xdd2a2d, 0x5AC6FF];

        static getNoteHoldColor(noteType: Notes.NoteType): number {
            return this.noteHoldColors[noteType];
        }
    }
}