module LunaJam.Settings {

    export class Controls {

        private static controles: number[] = [
            Phaser.Keyboard.ONE,
            Phaser.Keyboard.TWO,
            Phaser.Keyboard.THREE,
            Phaser.Keyboard.FOUR,
            Phaser.Keyboard.FIVE,
        ];

        public static getNoteKey(noteType: LunaJam.Notes.NoteType): number {
            return Controls.controles[noteType];
        }
    }
}