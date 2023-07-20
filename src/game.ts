import 'phaser'
import { GameConfig } from './config'
import GameManager from './manager/GameManager'

export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config)
    }
}

window.addEventListener('load', () => {
    const _game = new Game(GameConfig)
})

export const gameManager = GameManager.getInstance()
