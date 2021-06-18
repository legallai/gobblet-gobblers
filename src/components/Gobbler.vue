<template><div :class="[color, 'size-' + size]" /></template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'Gobbler',
        props: {
            color: {
                type: String,
                required: true,
            },
            size: {
                type: Number,
                required: true,
            },
        },
    });
</script>

<style scoped>
    div {
        border-radius: 50%;
    }

    .RED {
        background-color: red;
    }

    .GREEN {
        background-color: green;
    }

    .size-1 {
        width: 33%;
        height: 33%;
    }

    .size-2 {
        width: 66%;
        height: 66%;
    }

    .size-3 {
        width: 100%;
        height: 100%;
    }
</style>
