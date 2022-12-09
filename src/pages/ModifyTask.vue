<template>
  <q-page padding>
    <!-- eslint-disable -->
    <q-card class="q-pa-md edit-card" :style='"max-width: 400px;" + cardStyle + textStyle'>
      <q-form class="flex flex-block justify-evenly column">
        <q-input
          class="col edit-input"
          standout
          :dark="taskForEditing.isDark"
          v-model="taskForEditing.name"
          label="Task Name"
        ></q-input>
        <div class="edit-input">
          Due Date:
          <q-btn
            class="edit-btn"
            :style=buttonStyle
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
        <div
          class="edit-input"
        >
          <q-btn
            @click="colorButton = true"
            class="edit-btn"
            :style=buttonStyle
          > Change Color
          </q-btn>
        </div>
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
        <div class="edit-input">
          <SubtaskComponent
            :sub-tasks="taskForEditing.subtasks"
            style="background:#FFF4;"
          />
        </div>
      </q-form>
      <div class="flex row flex-inline justify-between">
        <q-btn
          v-if="props.taskId"
          flat
          class="edit-btn col-3"
          style="background: #C1001588"
          @click="deleteFunc"
        >
          Delete
        </q-btn>
        <q-btn
          class="edit-btn col-3"
          :style=buttonStyle
          @click="save"
        >Save
        </q-btn>
      </div>
    </q-card>
    <!-- eslint-enable -->
  </q-page>
</template>

<script setup>
import SubtaskComponent from "components/subtaskComponent.vue";
import {UserRepository} from "src/model/UserRepository";
import {computed, reactive, ref} from "vue";
import {Task} from "src/model/Task";
import {date} from "quasar";
import SimplePopupComponent from "components/SimplePopupComponent.vue"
import {isDark} from "src/model/isDark";



//        :sub-tasks="taskForEditing.subtasks"
const props = defineProps({
  taskId: {
    type: String,
    default: null
  }
})
let taskForEditing = {subtasks: {}}
let calPopUp = ref(false)

function test() {
  calPopUp.value = true
}

function deleteFunc() {
  if (props.taskId) {
    UserRepository.deleteFieldInUserData("tasks." + taskForEditing.id)
    goToPrevPage()
  }
}

function save() {
  let subtasks = Object.values(taskForEditing?.subtasks) ?? null
  if (subtasks.length > 0) {
    for (const subtask of subtasks) {
      if (!(subtask?.name.length > 0 && subtask?.pommesNeeded > 0)) {
        delete taskForEditing.subtasks[subtask.id]
      }
    }
  }
  UserRepository.updateCurrentUserData(`tasks.${taskForEditing.id}`, {...taskForEditing})
  goToPrevPage()
}

let colorButton = ref(false)
let buttonStyle = ref("");
let cardStyle = ref("");
let textStyle = ref("")


let buttonColor = computed({
  get() {
    return taskForEditing?.hex
  },
  set(value) {
    taskForEditing.isDark = isDark(value)
    taskForEditing.hex = value // eslint-disable-line
    buttonStyle.value = `background:${(taskForEditing.isDark ? '#FFF' : '#000') + 8};color:${taskForEditing.isDark ? "black" : "white"};`
    cardStyle.value = `background-color:${value};`
    textStyle.value = `color:${taskForEditing.isDark ? "white" : "black"};`


    textColorClass.value = taskForEditing.isDark ? " text-white " : ""
  }
})


let textColorClass = ref("")

let goToPrevPage = function () {
  window.history.back()
}

UserRepository.onUserDataSnapshot((snapshot) => {
  let temp =  props.taskId ? snapshot?.data()?.tasks?.[props.taskId] : new Task()
  if (temp){
    taskForEditing = reactive(temp)
  } else {
    goToPrevPage()
  }
  console.log("Task:", taskForEditing)
  buttonColor.value = buttonColor.value // eslint-disable-line
})


</script>

<style lang="scss" scoped>
.edit-card {

}

.edit-btn {

}

.edit-input {

  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
