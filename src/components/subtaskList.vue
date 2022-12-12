<template>
  <q-list bordered separator dense padding>
    <subtask-list-item
      v-for="(subtask, subIndex) in subtasks"
      :key="subIndex"
      :subtask="subtask"
    />
    <q-item
      disable
      v-if="!subtasks.length"
    >
      - Empty -
    </q-item>
  </q-list>
</template>

<script setup>
import SubtaskListItem from "components/subtaskListItem.vue";

defineProps({
  subtasks: {
    type: Array,
    required: true,
  },
})
</script>
