<template>
    {{ hasWon }}
    <div class="wrapper">
        <Pool :pool="playerOnePool" />
        <Board :board="board" />
        <Pool :pool="playerTwoPool" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { store } from '../store';

import Board from './Board.vue';
import Pool from './Pool.vue';

export default defineComponent({
    name: 'BoardGame',
    components: {
        Board,
        Pool,
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
});
</script>

<style scoped>
.wrapper {
    display: flex;
    width: 100%;
    align-items: center;
}
</style>
