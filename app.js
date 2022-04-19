
function generateRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min)
}

const app = Vue.createApp({

    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 1,
            winner: null,
            isGameOver: false,
            logMessages: []
        }
    },
    computed: {
        monsterHealthBar() {
            return { width: this.monsterHealth + '%' }
        },
        playerHealthBar() {
            return { width: this.playerHealth + '%' }
        },
        disabledTheSpecialAttack() {
            return (this.currentRound % 3 !== 0);
        }
    },
    watch: {
        monsterHealth(value) {
            if (value === 0 && this.playerHealth === 0) {
                this.winner = 'draw'
                this.isGameOver = true
            } else if (value === 0) {
                this.winner = 'player'
                this.isGameOver = true
            }
        },
        playerHealth(value) {
            if (value === 0 && this.monsterHealth === 0) {
                this.winner = 'draw'
                this.isGameOver = true
            } else if (value === 0) {
                this.winner = 'monster'
                this.isGameOver = true
            }
        }
    },
    methods: {
        attackMonster() {
            const attackValue = generateRandomNumber(12, 5);
            this.monsterHealth - attackValue <= 0 ? this.monsterHealth = 0 : this.monsterHealth -= attackValue
            this.attackPlayer();
            this.addLogMessages('player', 'attack', attackValue);
        },
        attackPlayer() {
            const attackValue = generateRandomNumber(15, 8);
            this.playerHealth - attackValue <= 0 ? this.playerHealth = 0 : this.playerHealth -= attackValue
            this.addLogMessages('monster', 'attack', attackValue);
            this.currentRound++
        },
        specialAttack() {
            const attackValue = generateRandomNumber(20, 10);
            this.monsterHealth - attackValue <= 0 ? this.monsterHealth = 0 : this.monsterHealth -= attackValue
            this.attackPlayer();
            this.addLogMessages('player', 'attack', attackValue);

        },
        heal() {
            const healValue = generateRandomNumber(20, 8);
            this.playerHealth + healValue > 100 ? this.playerHealth = 100 : this.playerHealth += healValue;
            this.attackPlayer();
            this.addLogMessages('player', 'heal', healValue);

        },
        surrender() {
            this.playerHealth = 0;
            this.isGameOver = true;
            this.winner = 'monster';
        },
        resetTheGame() {
            this.isGameOver = false;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 1;
            this.winner = null;
            this.logMessages = [];
        },
        addLogMessages(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }

    },

})

app.mount('#game');