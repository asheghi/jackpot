<template>
  <div class="game">
    <h1 class="header text-center">
      JackPot!
    </h1>
    <div class="credit text-center">
      <h2>Your Credit:</h2>
      <h2 class="amount">
        {{ currentCredit }}
      </h2>
    </div>
    <div class="blocks">
      <div class="block"
           v-for="symbolIndex in BLOCK_SIZE"
           :key="symbolIndex">
        <Block :symbol="currentRole[symbolIndex - 1]" :rolling="isRolling[symbolIndex - 1]"/>
      </div>
    </div>
    <div class="btns">
      <button :disabled="isStillRolling" class="btn roll" @click="onRollClicked">
        Roll
      </button>
      <div class="cash-out-wrapper">
        <button ref="cash-out" class="btn cash-out-btn"
                :disabled="disableCachOut"
                @click="cashOut = true"
        >
          Cash out
        </button>
      </div>
    </div>
    <teleport to="body" v-if="!currentCredit">
      <div class="game-over">
        <h1>
          Game Over
        </h1>
      </div>
    </teleport>
    <teleport to="body" v-if="cashOut">
      <div class="cash-out">
        <h1>
          $$$ Get Your Price $$$
        </h1>
      </div>
    </teleport>
  </div>
</template>

<script>
import {
  BLOCK_SIZE,
  calculate, checkReward, checkWinningRole, symbols,
} from './lib/game';
import Block from './components/Block.vue';

function range(arg) {
  return Array(arg).fill(null).map((it, index) => index);
}

export default {
  components: { Block },
  mounted() {
    this.$refs['cash-out'].onmouseenter = () => {
      const rand = Math.random() * 100;
      if (rand < 50) {
        this.moveCashOut();
      } else if (rand >= 50 && rand < 90) {
        this.disableCachOut = true;
        setTimeout(() => {
          this.disableCachOut = false;
        }, 5000);
      }
    };
    this.$refs['cash-out'].onmouseout = () => {
      console.log('onMouseLeave');
      this.disableCachOut = false;
    };
  },
  data() {
    return {
      BLOCK_SIZE,
      symbols,
      isRolling: {},
      currentCredit: 10,
      currentRole: symbols,
      cashOut: false,
      disableCachOut: false,
    };
  },
  methods: {
    async onRollClicked() {
      if (!this.currentCredit) return;

      this.startLoading();
      const role = calculate(this.currentCredit);
      this.currentRole = role;
      await this.finishLoading();

      const winning = checkWinningRole(role);
      if (winning) {
        this.currentCredit += checkReward(role);
      } else {
        this.currentCredit -= 1;
      }
    },
    startLoading() {
      range(BLOCK_SIZE).forEach((i) => {
        this.isRolling[i] = true;
      });
    },
    finishLoading() {
      return Promise.all(range(BLOCK_SIZE).map((it, i) => new Promise((resolve) => {
        setTimeout(() => {
          this.isRolling[i] = false;
          resolve();
        }, (i * 1000) + 1000);
      })));
    },
    moveCashOut() {
      const list = [
        'translateX(120px)',
        'translateX(-120px)',
        'translateY(120px)',
        'translateY(-120px)',
      ];
      const index = Math.floor(Math.random() * list.length);
      this.$refs['cash-out'].style.transform = list[index];
    },
  },
  computed: {
    isStillRolling() {
      return this.isRolling[BLOCK_SIZE - 1];
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;

}

#app {
  max-width: 780px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 1rem;

  .text-center {
    text-align: center;
  }

  .credit {
    padding: 1rem;
    display: flex;
    justify-content: center;
    gap: .25rem;
  }

  .blocks, {
    padding: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .btns {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    .btn {
      padding: .5rem 1rem;
      border-radius: .5rem;
      background: white;
      border: 1px solid rgba(gray, .4);
      color: rgba(black, .9);
      text-transform: uppercase;
      font-weight: 900;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all ease 260ms;
    }

    .btn:active {
      transform: scale(.9);
    }

    .btn:disabled {
      background: rgba(gray, .3);
      cursor: not-allowed;
    }
  }

  .cash-out-wrapper {
    position: relative;
    width: 100%;
    background: red;

    .cash-out-btn {
      width: 120px;
      position: absolute;
      left: calc(50% - 60px);
    }
  }
}

.game-over, .cash-out {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: white;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bolder;
}

.game-over {
  color: red;
}

.cash-out {
  color: green;
}
</style>
