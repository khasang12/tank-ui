import { IButton } from '../../types/button'

export default class Button extends Phaser.GameObjects.Container {
    private button: Phaser.GameObjects.Sprite
    private text: Phaser.GameObjects.BitmapText
    private scaleRatio: number
    private callback: () => void

    constructor(b: IButton) {
        super(b.scene, b.x, b.y)

        this.scaleRatio = b.scale

        // Create the button image using nine-slice scaling and add it to the container
        this.button = b.scene.add.sprite(0, 0, b.key).setInteractive()
        this.button.setScale(this.scaleRatio)
        this.add(this.button)

        // Create the button text and add it to the container
        this.text = b.scene.add.bitmapText(0, 0, 'font', b.text, 27)
        this.text.setOrigin(0.5)
        this.add(this.text)

        // Set the callback for the button click/touch events
        this.callback = b.callback

        // Add the button to the scene
        b.scene.add.existing(this)

        // Add event listeners for the button click/touch events
        this.button
            .on('pointerdown', this.onPointerDown, this)
            .on('pointerover', this.onPointerOver, this)
            .on('pointerup', this.onPointerUp, this)
            .on('pointerout', this.onPointerOut, this)
    }

    public onPointerDown() {
        this.button.setScale(this.scaleRatio * 0.9)
    }

    public onPointerOver() {
        this.button.setAlpha(0.8)
    }

    public onPointerUp() {
        this.button.setScale(this.scaleRatio)
        this.button.setAlpha(1)
        this.callback()
    }

    public onPointerOut() {
        this.button.setAlpha(1)
    }

    public enableBounce() {
        this.scene.tweens.add({
            targets: this,
            scale: 0.9,
            yoyo: true,
            repeat: -1,
            duration: 250,
            ease: 'Quad.easeInOut',
        })
    }

    public setTexture(key: string) {
        this.button.setTexture(key)
    }
}
