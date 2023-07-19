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

        const pauseText = this.add.text(-150, 0, 'PAUSED', {
            fontSize: '84px',
            color: '#000',
            fontStyle: 'bold',
        })

        this.resumeButton = new Button({
            scene: this,
            x: 0,
            y: 250,
            key: 'button',
            text: 'CONTINUE',
            scale: 1.35,
            callback: () => {
                this.scene.stop('PauseScene')
                this.scene.resume('HUDScene')
                this.scene.resume('GameScene')
                this.events.emit('resume')
            },
        })

        this.restartButton = new Button({
            scene: this,
            x: 0,
            y: 350,
            key: 'button',
            text: 'RESTART',
            scale: 1.35,
            callback: () => {
                this.scene.stop('PauseScene')
                this.scene.start('HUDScene')
                this.scene.start('GameScene')
                this.events.emit('resume')
            },
        })

        this.soundButton = new Button({
            scene: this,
            x: 0,
            y: 450,
            key: this.sound.mute ? 'sound-off' : 'sound-on',
            text: '',
            scale: 0.3,
            callback: () => {
                this.handleUpdateSound()
            },
        })

        const container = this.add.container(CONST.CANVAS_WIDTH / 2, 300, [
            pauseText,
            this.resumeButton,
            this.restartButton,
            this.soundButton,
        ])
    }

    private handleUpdateSound() {
        if (this.sound.mute) {
            this.sound.mute = false
            this.soundButton.setTexture('sound-on')
        } else {
            this.sound.mute = true
            this.soundButton.setTexture('sound-off')
        }
    }
}
