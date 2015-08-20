module LunaJam {

    export class MasterGroup extends Phaser.Group {

        bg: Phaser.Group;
        notes: Phaser.Group;
        notePress: Phaser.Group;
        ui: Phaser.Group;

        constructor(game: Phaser.Game) {
            super(game, null, "Master Group");

            this.bg = new Phaser.Group(game, this, "Background");
            this.notes = new Phaser.Group(game, this, "Notes");
            this.notePress = new Phaser.Group(game, this, "NotePress");
            this.ui = new Phaser.Group(game, this, "UI");
        }
    }
}