<template>
    <div class="player-pool">
        <div
            v-for="(gobbler, index) in pool"
            class="border"
        >
            <div
                class="gobbler-container"
                draggable="true"
                @dragstart="startPoolDrag($event, gobbler, index)"
            >
                <Gobbler
                    :color="gobbler.color"
                    :size="gobbler.size"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import Gobbler from './Gobbler.vue';

export default defineComponent({
  name: "Pool",
  components: {
      Gobbler
  },
  props: {
    pool: {
        default: [],
        type: Array,
    },
  },
  methods: {
    startPoolDrag(evt, gobbler, index) {
      // console.log('startPoolDrag', evt);
      // console.log('startDrag', gobbler);
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("gobbler", JSON.stringify(gobbler));
      evt.dataTransfer.setData("index", index);
      // console.log(evt, gobbler, index);
    },
  },
});
</script>

<style scoped>
.player-pool .gobbler-container {
    width: 100px;
    height: 100px;
}

.player-pool {
    display: flex;
    flex-direction: column;
}

/* TODO refactor this to be common */
.gobbler-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

/* TODO refactor this to be common */
.border {
    margin: 10px;
    border-radius: 10px;
    background: #e0e0e0;
    box-shadow: inset 20px 20px 60px #bebebe,
                inset -20px -20px 60px #ffffff;
}
</style>
