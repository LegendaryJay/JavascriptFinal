<template>
  <q-card
    class="q-pa-lg"
    id="subtasks"
    :key="updateVal"
  >
    <SubtaskItem
      class="q-my-md"
      v-for="(subTask, index) in subTasks"
      :key="index"
      :subTask=subTask
    />

    <q-btn @click="addTask" class="edit-btn">Add!!</q-btn>
  </q-card>
</template>

<script setup>
import {Subtask} from "src/model/Task";
import SubtaskItem from "components/subtaskItem.vue";
import {reactive, ref, watch} from "vue";

const props = defineProps({
  subTasks: {
    type: Object,
    required:true
  }
})

watch(props.subTasks,
  (currentVal) => {
    console.log(currentVal.length)
  },
  {deep: true}
)

let updateVal = ref(0)

function addTask() {
  let newSub = reactive(new Subtask())
  props.subTasks[newSub.id] = newSub// eslint-disable-line
  updateVal.value += 1
}
</script>
<!-- Notice lang="scss" -->
<style lang="scss">
</style>
