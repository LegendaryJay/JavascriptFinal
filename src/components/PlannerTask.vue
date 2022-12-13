<template>
  <div
    style="max-width: 500px"
  >
    <div class="text-center" v-if="task?.separate">
      <q-icon size="xl">
        <q-img src="~/assets/seperator.png"></q-img>
      </q-icon>
    </div>

    <div class="flex row">
      <div class="q-pa-md col-10" style="max-width: 600px">
        <q-expansion-item
          :dark="task?.isDark"
          v-model="isExtended"
          class="shadow-1 overflow-hidden"
          style="border-radius: 30px"
          icon="explore"
          :header-style="'background-color:' + (task?.hex ?? '#FFF') + '; color:' + (task?.isDark ? '#FFF' : '#000') + ';' "
          expand-icon-class="text-white"
        >
          <template #header>
            <q-item-section>
              <div class=" q-pt-md text-weight-light text-caption">{{ task?.dateText }}</div>
              <div class="text-h6">
                {{ task.name }}
              </div>
              <div class="q-pb-md">{{ pommesPerDayText(task?.pommesNeeded, task?.relativeDays) }}</div>
            </q-item-section>
            <q-item-section side class="text-h5">
              <div>
                {{ task?.pommesNeeded }}
                <icon-component/>
              </div>
            </q-item-section>
          </template>

          <q-card>
            <subtask-list
              :subtasks="Object.values(task?.subtasks ?? {})"
            />
          </q-card>
        </q-expansion-item>
      </div>
      <transition name="fade">
        <div v-show="isExtended" class="column justify-center col-1" >
          <q-btn class="q-my-sm" fab-mini color="negative" icon="delete" @click="() => (deleteDialog = true)"/>
          <q-btn class="q-my-sm" fab-mini text-color="white" color="primary" icon="edit" @click="$router.push('edit-task/' + task?.id)"/>
        </div>
      </transition>
      <div class="column justify-center col-1" >
        <q-btn class="q-my-sm" fab-mini text-color="white" color="green" icon="play_arrow" @click="$router.push('timer/' + task?.id)"/>
      </div>

      <simple-popup-component
        v-model="deleteDialog"
        :button-action="() => UserRepository.deleteFieldInUserData('tasks.' + props.task.id)"
        button-title="Delete"
        title="Delete Task?"
      >

        <text class="q-ma-md">
          Are you sure you want to delete the task "{{task?.name}}"?
        </text>

      </simple-popup-component>

    </div>
  </div>
</template>

<script setup>
import IconComponent from "components/iconComponent.vue";
import SubtaskList from "components/subtaskList.vue";
import {ref} from "vue";
import SimplePopupComponent from "components/SimplePopupComponent.vue"
import {UserRepository} from "src/model/UserRepository";

let isExtended = ref( false)
let deleteDialog = ref(false)

let props = defineProps({
  task: {
    type: Object,
    required: true
  }
})



let pommesPerDayText = function (pommes, daysLeft) {
  if (daysLeft > 0) {
    return "Pommes Needed per day: " + (pommes / daysLeft).toFixed(1)
  } else if (daysLeft === 0) {
    return ""
  } else {
    return "Past Due"
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
