<template>
  <q-page padding>
    <!-- eslint-disable -->
    <q-card class="q-pa-md" style="max-width: 400px">
      <text> {{ taskForEditing.id }}</text>
      <q-form class="flex flex-block justify-evenly column">
        <q-input
          class="col"
          filled
          v-model="taskForEditing.name"
          label="Task Name"
        ></q-input>
        <div>
          Due Date:
          <q-btn
            @click.prevent="test"
          >
            {{ date.formatDate(taskForEditing.dueDate, 'MM / DD / YYYY') }}
          </q-btn>
        </div>
        <simple-popup-component
          v-model="calPopUp"
          title="Set Due Date"
        >
          <q-date
            class="q-mx-md"
            v-model="taskForEditing.dueDate"
            @keyup.enter="calPopUp = false"
          />
        </simple-popup-component>
        <q-btn @click="colorButton = true" :style='"width: 10px; " + buttonStyle'></q-btn>
        <simple-popup-component
          v-model="colorButton"
          title="Pick Color"
        >
          <q-color

            class="col q-ma-md"
            name="accent_color"
            v-model="buttonColor"
            style="width: 200px; max-width: 100%;"
          />
        </simple-popup-component>
        <SubtaskComponent
          :sub-tasks="taskForEditing.subtasks"
        />
      </q-form>
      <q-btn @click="save">Save</q-btn>
    </q-card>

    <!-- eslint-enable -->

  </q-page>
</template>

<script setup>
import SubtaskComponent from "components/subtaskComponent.vue";
import {UserRepository} from "src/model/UserRepository";
import {computed, onMounted, reactive, ref} from "vue";
import {Task} from "src/model/Task";
import {date} from "quasar";
import SimplePopupComponent from "components/SimplePopupComponent.vue"
import {useUserStore} from "stores/User";

//        :sub-tasks="taskForEditing.subtasks"
const props = defineProps({
  taskId: {
    type: String,
    default: null
  }
})
let taskForEditing = {subtasks:{}}
let calPopUp = ref(false)
onMounted(() => {
  taskForEditing = reactive(useUserStore().userData?.tasks?.[props.taskId] ?? new Task())
  console.log("Task:", taskForEditing)
  // noinspection SillyAssignmentJS
  buttonColor.value = buttonColor.value
})

function test() {
  calPopUp.value = true
}

function save() {
  UserRepository.updateCurrentUserData( {[`tasks.${taskForEditing.id}`]:{...taskForEditing}} )
}

let colorButton = ref(false)
let buttonStyle = ref("");
let buttonColor = computed({
  get() {
    return taskForEditing?.hex
  },
  set(value) {
    taskForEditing.hex = value // eslint-disable-line
    buttonStyle.value = `background-color:${value};`
  }
})


// name: 'PageName',

</script>
