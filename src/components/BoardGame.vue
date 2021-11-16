<template>
    {{ hasWon }}
    <Board :board="board" />
    <Pool :pool="playerOnePool" />
    <Pool :pool="playerTwoPool" />
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
</style>
