<template>
  <q-page padding>

    <div
      v-for="(task, index) in orderedTasks"
      class="q-mt-lg"
      style="max-width: 500px"
      :key="index"
      :id="index"
      @click="$router.push('edit-task/' + task?.id)"
    >
      {{ task.dateText }}
      <q-card
        :style="'background-color:' + (task?.hex ?? '#FFF') + '; color:' + (task?.isDark ? '#FFF' : '#000') + ';' "
      >
        <q-card-section class="flex justify-between">
          <h3 class="col-9">
            {{ task.name }}
          </h3>
          <h4 class="col-3">
            {{ task?.pommesNeeded }}
            <icon-component/>
          </h4>
        </q-card-section>
        <q-card-section class="flex-center justify-center">
          <text class="col">
            Things
          </text>
        </q-card-section>


      </q-card>
    </div>

    <q-btn
      fab class="bg-primary text-white"
      icon="add"
      @click="$router.push('new-task')"
    />

  </q-page>
</template>

<script setup>
import {UserRepository} from "src/model/UserRepository";
import {computed, onMounted, reactive} from "vue";
import IconComponent from "components/iconComponent.vue";

let tasks = reactive({})
onMounted(() =>
  UserRepository.onUserDataSnapshot(
    (snapshot) => {
      Object.assign(tasks, snapshot.data()?.tasks ?? {})
    }
  )
)

function readableTime(date) {
  const relativeDays = Math.ceil((date - Date.now()) / (1000 * 3600 * 24));
  let positiveRelativeDays = Math.abs(relativeDays)
  let depth;
  let result
  const isPast = Math.sign(relativeDays) === -1

  if (positiveRelativeDays > 6) {
    result = (isPast ? "" : "in ") + positiveRelativeDays + " days" + (isPast ? " ago" : "")
    depth = 2
  } else if (positiveRelativeDays > 1) {
    depth = 1
    result = (isPast ? "Last " : "") + (new Date(date)).toLocaleDateString('en-US', {
      weekday: 'long',
    })
      console.log(isPast, positiveRelativeDays, relativeDays)
  } else {
    depth = 0
    switch (relativeDays) {
      case 0:
        result = "Today"
        break
      case 1:
        result = "Tomorrow"
        break
      case -1:
        result = "Yesterday"
        break
      default:
        break
    }
  }
  if (isPast) {
    depth = -1
  }

  return {
    text: result,
    depth,
    relativeDays,
  }
}

let orderedTasks = computed(() => {
  let moddedTasks = Object.values(tasks) ?? [];

  moddedTasks.forEach(x => {
    let temp = readableTime(x.dueDate);
    x.dateText = temp.text;
    x.dateDepth = temp.depth;
    x.relativeDays = temp.relativeDays;

    let subtasks = (Object.values(x?.subtasks) ?? [])
    x.pommesNeeded = subtasks.reduce((add, x) => add + (x?.pommesNeeded ?? 0), 0)
    console.log("this Task", x.pommesNeeded)
  });

  return moddedTasks.sort((a, b) => a.relativeDays - b.relativeDays).sort((a, b) => a.dateDepth - b.dateDepth);
})

</script>

<style lang="scss">

</style>
