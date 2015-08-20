namespace LunaJam {

    export class ScoreBoard extends Phaser.Sprite {
        streak: number = 0;
        longestStreak: number = 0;
        score: number = 0;

        //UI
        lbl_streak:     Phaser.Text;
        lbl_multiplier: Phaser.Text;
        lbl_score:      Phaser.Text; 
        

        constructor(game: Phaser.Game) {
            super(game, 10, 10);

            var bg: Phaser.Graphics = game.make.graphics(0, 0);
            bg.beginFill(0xFFFFFF, 0.7);
            bg.moveTo(0, 0);
            bg.lineTo(300, 0);
            bg.lineTo(300, 50);
            bg.lineTo(0, 50);
            bg.lineTo(0, 0);
            this.addChild(bg);
            

            var style_lit = {
                font: "bold 10pt Calibri"
            };
            var style_lbl = {
                font: "bold 20pt Calibri"
            };            

            //Scores
            var lit_score: Phaser.Text = game.make.text(290, 30, "SCORE", style_lit);
            lit_score.addColor("#676567", 0);
            lit_score.anchor.set(1, 0);
            this.addChild(lit_score);
            this.lbl_score = game.make.text(290, 5, "0", style_lbl);
            this.lbl_score.addColor("#343434", 0);
            this.lbl_score.anchor.set(1, 0);
            this.addChild(this.lbl_score);
            

            //Multiplier
            var lit_multi: Phaser.Text = game.make.text(150, 30, "MULTIPLIER", style_lit);
            lit_multi.addColor("#676567", 0);
            lit_multi.anchor.set(1, 0);
            this.addChild(lit_multi);
            this.lbl_multiplier = game.make.text(150, 5, "1x", style_lbl);
            this.lbl_multiplier.addColor("#343434", 0);
            this.lbl_multiplier.anchor.set(1, 0);
            this.addChild(this.lbl_multiplier);
            
            //Streak
            var lit_streak: Phaser.Text = game.make.text(70, 30, "STREAK", style_lit);
            lit_streak.addColor("#676567", 0);
            lit_streak.anchor.set(1, 0);
            this.addChild(lit_streak);
            this.lbl_streak = game.make.text(70, 5, "0", style_lbl);
            this.lbl_streak.addColor("#343434", 0);
            this.lbl_streak.anchor.set(1, 0);
            this.addChild(this.lbl_streak);
        }

        addToScore(score: number) {
            if (isNaN(score))
                return;
            this.score += score;
            this.setScore(this.score);
        }

        setScore(score: number) {
            if(isNaN(score))
                return;
            this.score = score;
            this.lbl_score.setText(Math.round(score).toString());
        }

        addToStreak(i: number) {
            this.streak += i;
            this.setStreak(this.streak);
        }

        setStreak(i: number) {
            this.streak = i;
            this.lbl_streak.setText(this.streak.toString());
        }

        endStreak() {
            this.longestStreak = this.streak;
            this.setStreak(0);
        }
    }


}