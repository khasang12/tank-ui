import { CONST } from '../constants/const'
import Button from '../objects/buttons/Button'

export class PauseScene extends Phaser.Scene {
    private resumeButton: Button
    private restartButton: Button
    private soundButton: Button

    constructor() {
        super({
            key: 'PauseScene',
        })
    }

    create(): void {
        this.cameras.main.setBackgroundColor('rgba(255,255,255,0.4)')
        // create events
        const pauseText = this.add.text(CONST.CANVAS_WIDTH / 2 - 150, 300, 'PAUSED', {
            fontSize: '84px',
            color: '#000',
            fontStyle: 'bold',
        })

        this.resumeButton = new Button({
            scene: this,
            x: CONST.CANVAS_WIDTH / 2,
            y: 550,
            key: 'button',
            text: 'CONTINUE',
            scale: 1.4,
            callback: () => {
                this.scene.stop('PauseScene')
                this.scene.resume('GameScene')
            },
        })

        this.restartButton = new Button({
            scene: this,
            x: CONST.CANVAS_WIDTH / 2,
            y: 650,
            key: 'button',
            text: 'RESTART',
            scale: 1.4,
            callback: () => {
                this.scene.stop('PauseScene')
                this.scene.start('GameScene')
            },
        })

        this.soundButton = new Button({
            scene: this,
            x: CONST.CANVAS_WIDTH / 2,
            y: 750,
            key: 'sound-on',
            text: '',
            scale: 0.3,
            callback: () => {
                this.soundButton.setTexture('sound-off')
            },
        })
    }
}
