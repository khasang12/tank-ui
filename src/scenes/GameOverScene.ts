import { CONST } from '../constants/const'
import Button from '../objects/buttons/Button'

export class GameOverScene extends Phaser.Scene {
    private retryButton: Button

    constructor() {
        super({
            key: 'GameOverScene',
        })

        if (!localStorage.getItem('high-score')) {
            localStorage.setItem('high-score', '0')
        }
    }

    create(): void {
        this.cameras.main.setBackgroundColor('rgba(255,255,255)')

        const gameOverText = this.add.text(CONST.CANVAS_WIDTH / 2 - 250, 300, 'GAME OVER', {
            fontSize: '100px',
            color: '#000',
            fontStyle: 'bold',
        })

        const bestScoreMsgText = this.add.text(CONST.CANVAS_WIDTH / 2 - 210, 450, 'BEST SCORE:', {
            fontSize: '50px',
            color: '#000',
        })

        const scoreMsgText = this.add.text(CONST.CANVAS_WIDTH / 2 - 210, 500, 'SCORE:', {
            fontSize: '50px',
            color: '#000',
        })

        const bestScoreText = this.add
            .text(CONST.CANVAS_WIDTH / 2 + 200, 450, <string>localStorage.getItem('high-score'), {
                fontSize: '50px',
                color: '#000',
            })
            .setAlpha(0)

        const scoreText = this.add.text(CONST.CANVAS_WIDTH / 2 + 200, 500, '0', {
            fontSize: '50px',
            color: '#000',
        })

        this.tweens.add({
            targets: { score: '0' },
            score: this.registry.get('score'),
            duration: 1000,
            ease: 'Power1',
            onUpdate: function (tween: any) {
                // Update the score text with the rounded score value
                scoreText.text = Math.round(tween.targets[0].score).toString()
            },
            onComplete: () => {
                // Animation complete callback
                const curBest = parseInt(<string>localStorage.getItem('high-score'))
                if (curBest < this.registry.get('score')) {
                    localStorage.setItem('high-score', this.registry.get('score'))
                    bestScoreText.setText(this.registry.get('score').toString()).setAlpha(1)
                } else bestScoreText.setText(curBest.toString()).setAlpha(1)
            },
        })

        this.retryButton = new Button({
            scene: this,
            x: CONST.CANVAS_WIDTH / 2,
            y: 700,
            key: 'restart',
            text: '',
            scale: 0.25,
            callback: () => {
                //this.scene.start('HUDScene')
                this.scene.start('GameScene')
                //this.scene.bringToTop('HUDScene')
            },
        })
        this.retryButton.enableBounce()
    }
}
