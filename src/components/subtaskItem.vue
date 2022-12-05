<template>
  <q-card-section
    style="background-color: white"
  >
    <!-- eslint-disable -->
    <q-form class="column justify-between">
      <q-input
        class="col"
        filled
        v-model="subTask.name"
        label="Name"
      />
      <q-input
        class="col"
        v-model.number="subTask.pommesNeeded"
        type="number"
        filled
        style="max-width: 70px"
        label="Pommes Needed"
      />
    </q-form>
    <!-- eslint-enable -->
  </q-card-section>
</template>
<script setup>
import {Subtask} from "src/model/Task";
import {onMounted} from "vue";

const props = defineProps(
  {
    subTask: {
      type: Subtask,
      required: true,
    }
  }
)


onMounted(() => {
  console.log("item mounted!")
})
</script>
