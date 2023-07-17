export class MenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = []

    constructor() {
        super({
            key: 'MenuScene',
        })
    }

    init(): void {
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.startKey.isDown = false
        this.registry.set('score', 0)
        this.registry.set('tank', 0)
    }

    create(): void {
        this.cameras.main.setBackgroundColor('rgba(131, 105, 83)')

        this.bitmapTexts.push(this.add.bitmapText(0, 0, 'font', 'TANK', 100))

        this.bitmapTexts.push(this.add.bitmapText(10, +120, 'font', 'PRESS S TO PLAY', 30))

        const _container = this.add.container(
            this.sys.canvas.width / 2 - 120,
            this.sys.canvas.height / 2 - 100,
            this.bitmapTexts
        )
    }

    update(): void {
        if (this.startKey.isDown) {
            this.scene.start('HUDScene')
            this.scene.start('GameScene')
            this.scene.bringToTop('HUDScene')
        }
    }
}
