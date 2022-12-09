<template>
  <q-card
    class="q-pa-xs"
    :style='"background:#FFF" + (hasContent?"F":"5")'
  >
    <!-- eslint-disable -->
    <q-form class="">
      <q-input
        :rules="[val => val.length > 0 || 'Field is required']"
        class="q-pa-md"
        filled
        dense
        v-model="subTask.name"
        label="Name"
      />
      <q-input
        :rules="[val => val > 0 || 'Must be greater than 0']"
        class="q-pa-md"
        dense
        v-model.number="subTask.pommesNeeded"
        type="number"
        filled
        label="Pommes Needed"
      />
    </q-form>
    <!-- eslint-enable -->
  </q-card>
</template>
<script setup>
import {Subtask} from "src/model/Task";
import {computed} from "vue";

const props = defineProps(
  {
    subTask: {
      type: Subtask,
      required: true,
    }
  }
)
let hasContent = computed( () => {
  console.log(props.subTask.name.length > 0 && props.subTask.pommesNeeded > 0)
  return props.subTask.name.length > 0 && props.subTask.pommesNeeded > 0
  }
)


</script>
