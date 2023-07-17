import { CONST } from '../constants/const'
import Button from '../objects/buttons/Button'

export class HUDScene extends Phaser.Scene {
    private pauseButton: Button

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
                this.scene.launch('PauseScene')
            },
        })

        // Create a score label and add it to the HUD
        const scoreLabel = this.add.text(CONST.CANVAS_WIDTH - 300, 30, 'Score: 0', {
            fontSize: '44px',
            color: '#000',
        })

        const level = this.scene.get('GameScene')
        level.events.on('scoreChanged', (score: number) => {
            const newScore = this.registry.values.score + score
            this.registry.values.score += score
            console.log(score, this.registry.values.score, newScore)
            scoreLabel.setText(`Score: ${newScore}`)
        })
    }
}
