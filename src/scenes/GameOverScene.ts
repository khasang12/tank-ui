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
        this.cameras.main.setBackgroundColor('rgba(131, 105, 83)')

        const gameOverMsg = this.add.bitmapText(-240, 0, 'font', 'GAME OVER', 100)
        const scoreMsg = this.add.bitmapText(
            -210,
            150,
            'font',
            'POINTS:\nDESTROYED:\nSCORE:\nBEST SCORE:',
            50,
            0
        )
        const pointText = this.add.text(200, 150, this.registry.get('score'), {
            fontSize: '50px',
            color: '#fff',
        })

        const tankText = this.add
            .text(200, 210, this.registry.get('tank'), {
                fontSize: '50px',
                color: '#fff',
            })
            .setAlpha(0)

        const scoreText = this.add
            .text(200, 270, '0', {
                fontSize: '50px',
                color: '#fff',
            })
            .setAlpha(0)

        const bestScoreText = this.add
            .text(200, 330, <string>localStorage.getItem('high-score'), {
                fontSize: '50px',
                color: '#fff',
            })
            .setAlpha(0)

        

        this.tweens.add({
            targets: { score: '0' },
            score: this.registry.get('score'),
            duration: 1000,
            autoDestroy: true,
            ease: 'Power1',
            onUpdate: function (tween: any) {
                // Update the score text with the rounded score value
                pointText.text = Math.round(tween.targets[0].score).toString()
            },
            onComplete: () => {
                // Animation complete callback
                tankText.setAlpha(1)
                this.tweens.add({
                    targets: { tank: '0' },
                    tank: this.registry.get('tank'),
                    duration: 500,
                    autoDestroy: true,
                    ease: 'sine.in',
                    onUpdate: function (tween: any) {
                        // Update the score text with the rounded score value
                        tankText.text = Math.round(tween.targets[0].tank).toString() + ' x20'
                    },
                    onComplete: () => {
                        const curBest = parseInt(<string>localStorage.getItem('high-score'))
                        const newScore = this.registry.get('score') + 20 * this.registry.get('tank')
                        scoreText.setText(newScore.toString()).setAlpha(1)
                        if (curBest < newScore) {
                            localStorage.setItem('high-score', newScore)
                            bestScoreText.setText(newScore.toString()).setAlpha(1)
                        } else bestScoreText.setText(curBest.toString()).setAlpha(1)
                        this.retryButton.enableBounce()
                    },
                })
            },
        })

        this.retryButton = new Button({
            scene: this,
            x: 30,
            y: 500,
            key: 'restart',
            text: '',
            scale: 0.25,
            callback: () => {
                this.scene.bringToTop('HUDScene')
                this.scene.transition({
                    target: 'GameScene',
                    duration: 1000,
                    moveBelow: true,
                    onUpdate: this.transitionOut,
                })
            },
        })

        this.add.container(CONST.CANVAS_WIDTH / 2, 300, [
            gameOverMsg,
            scoreMsg,
            pointText,
            tankText,
            bestScoreText,
            scoreText,
            this.retryButton,
        ])
    }

    public transitionOut(progress: number) {
        this.cameras.main.y = 1000 * progress
    }
}
