import SoundManager from './SoundManager'

export default class GameManager {
    private static instance: GameManager
    public soundManager: SoundManager

    private constructor() {
        this.soundManager = SoundManager.getInstance()
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager()
        }
        return GameManager.instance
    }
}
