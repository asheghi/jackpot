<template>
  <div class="block-wrapper">
    <div class="block" :class="rolling ? 'rolling' : ''" >
     <div class="block-symbol">
       {{rolling ? 'X' : symbol}}
     </div>
    </div>
    <div class="rolling-motion rolling " v-if="rolling" :class="rolling ? 'rolling':''">
      <div v-for="index in 120" :key="index">
        {{symbols[index % symbols.length]}}
      </div>
    </div>
  </div>
</template>
<script>
import { symbols } from '../lib/game';

export default {
  name: 'Block',
  data() {
    return {
      symbols,
    };
  },
  props: {
    symbol: {
      required: true,
    },
    rolling: {
      required: true,
      type: Boolean,
    },
  },
};
</script>
<style lang="scss">
.block-wrapper{
  position: relative;
}
.block {
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(gray,.3);
  border-radius: .5rem;
  font-size: 2rem;
  position: relative;
  text-transform: uppercase;
  overflow: hidden;

  &.rolling{
    .block-symbol{
      opacity: 0;
    }
  }

  @keyframes roll {
    from{
      top: 0;
    }
    to{
      top: -10000%;
    }
  }

  .rolling-motion{
    position: absolute;
    left: 0;
    right: 0;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
    margin-top: 1rem;

    top: 0px;
    animation: roll;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}
</style>
