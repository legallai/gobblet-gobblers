<template>
    {{ hasWon }}
    <div class="wrapper">
        <div class="board border">
            <div
                v-for="(gobbler, index) in board"
                class="border"
                @drop="dragged($event, index)"
                @dragenter.prevent
                @dragover.prevent
            >
                <div
                    v-if="gobbler"
                    class="gobbler-container"
                    draggable="true"
                    @dragstart="startDrag($event, gobbler, index)"
                >
                    <Gobbler
                        :color="gobbler.color"
                        :size="gobbler.size"
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="player-pool player-one-pool">
        <div
            v-for="(gobbler, index) in playerOnePool"
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
    <div class="player-pool player-two-pool">
        <div
            v-for="(gobbler, index) in playerTwoPool"
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
import { defineComponent } from 'vue';
import { store } from '../store';
import Gobbler from './Gobbler.vue';
export default defineComponent({
    name: 'BoardGame',
    components: {
        Gobbler,
    },
    computed: {
        board() {
            return store.state.board.flat();
        },
        playerOnePool() {
            return store.state.playerOnePool;
        },
        playerTwoPool() {
            return store.state.playerTwoPool;
        },
        hasWon() {
            return store.getters.hasWon;
        },
    },
    methods: {
        startDrag(evt, gobbler, index) {
            // console.log('startDrag', evt);
            // console.log('startDrag', gobbler);
            evt.dataTransfer.dropEffect = 'move';
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('gobbler', JSON.stringify(gobbler));
            evt.dataTransfer.setData('coordinates', JSON.stringify(this.convertFlatIndex(index)));
        },
        startPoolDrag(evt, gobbler, index) {
            // console.log('startPoolDrag', evt);
            // console.log('startDrag', gobbler);
            evt.dataTransfer.dropEffect = 'move';
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('gobbler', JSON.stringify(gobbler));
            evt.dataTransfer.setData('index', index);
            // console.log(evt, gobbler, index);
        },
        dragged(evt, index) {
            // console.log('dragged', evt);
            const { color, size } = JSON.parse(evt.dataTransfer.getData('gobbler'));
            // console.log('dragged', { color, size });
            // console.log('dragged', index);
            // console.log('dragged', this.convertFlatIndex(index));
            store.commit('addGobbler', {
                coordinates: this.convertFlatIndex(index),
                color,
                size,
                poolIndex: evt.dataTransfer.getData('index'),
            });
            // console.log(evt.dataTransfer.getData('index'));
            // store.commit('removeGobbler', JSON.parse(evt.dataTransfer.getData('coordinates')))
        },
        convertFlatIndex(index: number) {
            return { x: Math.floor(index / 3), y: index % 3 };
        },
    },
});
</script>

<style>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.border {
    border: solid 1px grey;
}

.board {
    display: grid;
    width: 300px;
    height: 300px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
}

.player-pool {
    display: flex;
}

.gobbler-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.player-pool .gobbler-container {
    width: 100px;
    height: 100px;
}
</style>
