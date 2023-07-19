import { CONST } from '../constants/const'
import Button from '../objects/buttons/Button'

export class HUDScene extends Phaser.Scene {
    private pauseButton: Button
    private scoreLabel: Phaser.GameObjects.Text

    constructor() {
        super({
            key: 'HUDScene',
        })
    }

    create(): void {
        // Create a pause button and add it to the HUD
        this.pauseButton = new Button({
            scene: this,
            x: 70,
            y: 50,
            key: 'pause',
            text: '',
            scale: 0.15,
            callback: () => {
                this.scene.pause('GameScene')
                this.scene.pause('HUDScene')
                this.scene.launch('PauseScene')
                this.pauseButton.setAlpha(0)
            },
        })

        // Create a score label and add it to the HUD
        this.scoreLabel = this.add.text(CONST.CANVAS_WIDTH - 300, 30, 'Score: 0', {
            fontSize: '44px',
            color: '#000',
        })

        const level = this.scene.get('GameScene')
        level.events.on('scoreChanged', (score: number) => {
            const newScore = this.registry.values.score + score
            this.registry.values.score += score
            this.scoreLabel.setText(`Score: ${newScore}`)
        })
        level.events.on('resetScore', () => {
            this.registry.values.score = 0
            this.registry.values.tank = 0
            this.scoreLabel.setText(`Score: 0`)
        })
        level.events.on('gameover', () => {
            this.pauseButton.setAlpha(0)
            this.time.delayedCall(2000, () => this.pauseButton.setAlpha(1))
        })

        const pause = this.scene.get('PauseScene')
        pause.events.on('resume', () => {
            this.pauseButton.setAlpha(1)
        })
    }
}
